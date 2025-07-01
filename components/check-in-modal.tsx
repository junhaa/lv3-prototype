"use client"

import { useState } from "react"
import { MapPin, Clock, Camera, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"

interface CheckInModalProps {
  isOpen: boolean
  onClose: () => void
  job: any
}

export function CheckInModal({ isOpen, onClose, job }: CheckInModalProps) {
  const [isCheckedIn, setIsCheckedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  if (!job) return null

  const handleCheckIn = async () => {
    setIsLoading(true)

    // 출근 체크 로직 시뮬레이션
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsCheckedIn(true)
    setIsLoading(false)

    toast({
      title: "출근 체크 완료!",
      description: "근무를 시작해주세요. 화이팅!",
    })

    setTimeout(() => {
      onClose()
    }, 2000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle>출근 체크</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Job Info */}
          <Card>
            <CardContent className="p-4">
              <div className="text-center mb-4">
                <h3 className="font-bold text-lg">{job.title}</h3>
                <p className="text-gray-600">{job.company}</p>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span>
                    {job.startTime} - {job.endTime}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {!isCheckedIn ? (
            <>
              {/* Location Verification */}
              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="p-4 text-center">
                  <MapPin className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm text-blue-800 mb-2">위치 확인 중...</p>
                  <p className="text-xs text-blue-600">근무지 반경 100m 이내에 있습니다</p>
                </CardContent>
              </Card>

              {/* Photo Verification */}
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">셀카를 찍어 출근을 인증해주세요</p>
                    <Button variant="outline" className="bg-transparent">
                      <Camera className="h-4 w-4 mr-2" />
                      사진 촬영
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Check In Button */}
              <Button
                className="w-full h-12 bg-green-600 hover:bg-green-700"
                onClick={handleCheckIn}
                disabled={isLoading}
              >
                {isLoading ? "출근 체크 중..." : "출근 체크하기"}
              </Button>
            </>
          ) : (
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-6 text-center">
                <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-bold text-green-800 mb-2">출근 체크 완료!</h3>
                <p className="text-sm text-green-700">근무를 시작해주세요</p>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
