"use client"

import { useState, useEffect } from "react"
import { MapPin, Clock, CheckCircle, AlertCircle, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { toast } from "@/hooks/use-toast"

interface CheckInModalProps {
  isOpen: boolean
  onClose: () => void
  job: any
}

export function CheckInModal({ isOpen, onClose, job }: CheckInModalProps) {
  const [step, setStep] = useState<"location" | "success">("location")
  const [isCheckingLocation, setIsCheckingLocation] = useState(false)
  const [locationStatus, setLocationStatus] = useState<"checking" | "success" | "error">("checking")
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)

  // 근무지 위치 (시뮬레이션)
  const workplaceLocation = {
    lat: 37.5665,
    lng: 127.0997,
    name: job?.location || "잠실역 근처"
  }

  useEffect(() => {
    if (isOpen && step === "location") {
      handleLocationCheck()
    }
  }, [isOpen, step])

  const handleLocationCheck = async () => {
    setIsCheckingLocation(true)
    setLocationStatus("checking")

    try {
      // 위치 권한 요청 및 현재 위치 가져오기
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        if (!navigator.geolocation) {
          reject(new Error("Geolocation is not supported"))
          return
        }

        navigator.geolocation.getCurrentPosition(
          resolve,
          reject,
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 60000
          }
        )
      })

      const currentLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }

      setUserLocation(currentLocation)

      // 거리 계산 (하버사인 공식)
      const distance = calculateDistance(
        currentLocation.lat,
        currentLocation.lng,
        workplaceLocation.lat,
        workplaceLocation.lng
      )

      // 100m 이내인지 확인
      if (distance <= 0.1) { // 0.1km = 100m
        setLocationStatus("success")
        setTimeout(() => {
          setStep("success")
        }, 1500)
      } else {
        setLocationStatus("error")
        toast({
          title: "위치 인증 실패",
          description: `근무지에서 ${Math.round(distance * 1000)}m 떨어져 있습니다. 근무지 100m 이내에서 출근 체크해주세요.`,
          variant: "destructive"
        })
      }
    } catch (error) {
      setLocationStatus("error")
      toast({
        title: "위치 인증 실패",
        description: "위치 정보를 가져올 수 없습니다. GPS를 켜고 다시 시도해주세요.",
        variant: "destructive"
      })
    } finally {
      setIsCheckingLocation(false)
    }
  }

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371 // 지구의 반지름 (km)
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLon = (lon2 - lon1) * Math.PI / 180
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    return R * c
  }

  const handleComplete = () => {
    toast({
      title: "출근 체크 완료!",
      description: "성공적으로 출근 체크되었습니다.",
    })
    onClose()
    setStep("location")
    setLocationStatus("checking")
  }

  const handleRetry = () => {
    setStep("location")
    setLocationStatus("checking")
    handleLocationCheck()
  }

  if (!job) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>출근 체크</span>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Job Info */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{job.title}</CardTitle>
              <div className="text-sm text-gray-600">{job.company}</div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                <Clock className="h-4 w-4" />
                <span>{job.workTime}</span>
              </div>
            </CardContent>
          </Card>

          {step === "location" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  위치 인증
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm text-gray-600">
                  근무지 100m 이내에서 출근 체크가 가능합니다.
                </div>

                {locationStatus === "checking" && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-sm">위치 확인 중...</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                )}

                {locationStatus === "success" && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm font-medium">위치 인증 성공!</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      근무지 반경 내에 있습니다.
                    </div>
                  </div>
                )}

                {locationStatus === "error" && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-red-600">
                      <AlertCircle className="h-4 w-4" />
                      <span className="text-sm font-medium">위치 인증 실패</span>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full bg-transparent" 
                      onClick={handleRetry}
                      disabled={isCheckingLocation}
                    >
                      다시 시도
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {step === "success" && (
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <div className="font-semibold text-lg mb-2">출근 체크 완료!</div>
                <div className="text-sm text-gray-600 mb-4">
                  {new Date().toLocaleString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={handleComplete}>
                  확인
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
