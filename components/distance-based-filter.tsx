"use client"

import { useState, useEffect } from "react"
import { MapPin, Navigation, FileSlidersIcon as SliderIcon, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface DistanceBasedFilterProps {
  isOpen: boolean
  onClose: () => void
  onApply: (filters: any) => void
}

export function DistanceBasedFilter({ isOpen, onClose, onApply }: DistanceBasedFilterProps) {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number; address: string } | null>(null)
  const [distance, setDistance] = useState([2])
  const [isLoadingLocation, setIsLoadingLocation] = useState(false)
  const [locationError, setLocationError] = useState<string | null>(null)

  useEffect(() => {
    if (isOpen) {
      getCurrentLocation()
    }
  }, [isOpen])

  const getCurrentLocation = () => {
    setIsLoadingLocation(true)
    setLocationError(null)

    // 위치 정보 지원 여부 확인
    if (!navigator.geolocation) {
      setLocationError("이 브라우저는 위치 정보를 지원하지 않습니다.")
      setDefaultLocation()
      return
    }

    // 위치 정보 요청 옵션
    const options = {
      enableHighAccuracy: false, // 정확도보다 속도 우선
      timeout: 10000, // 10초 타임아웃
      maximumAge: 300000, // 5분간 캐시된 위치 사용
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords

        try {
          // 역지오코딩을 통해 주소 가져오기
          const address = await reverseGeocode(latitude, longitude)
          setUserLocation({
            lat: latitude,
            lng: longitude,
            address: address,
          })
          setLocationError(null)
        } catch (error) {
          console.warn("주소 변환 실패:", error)
          setUserLocation({
            lat: latitude,
            lng: longitude,
            address: "현재 위치",
          })
        }
        setIsLoadingLocation(false)
      },
      (error) => {
        console.warn("위치 정보 가져오기 실패:", error)

        let errorMessage = ""
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "위치 정보 접근이 거부되었습니다. 브라우저 설정에서 위치 권한을 허용해주세요."
            break
          case error.POSITION_UNAVAILABLE:
            errorMessage = "위치 정보를 사용할 수 없습니다. 기본 위치로 설정합니다."
            break
          case error.TIMEOUT:
            errorMessage = "위치 정보 요청 시간이 초과되었습니다. 기본 위치로 설정합니다."
            break
          default:
            errorMessage = "위치 정보를 가져올 수 없습니다. 기본 위치로 설정합니다."
            break
        }

        setLocationError(errorMessage)
        setDefaultLocation()
      },
      options,
    )
  }

  const setDefaultLocation = () => {
    // 기본 위치 설정 (잠실역)
    setUserLocation({
      lat: 37.5133,
      lng: 127.1028,
      address: "잠실역 근처 (기본 위치)",
    })
    setIsLoadingLocation(false)
  }

  const reverseGeocode = async (lat: number, lng: number): Promise<string> => {
    try {
      // 실제 환경에서는 카카오맵 API나 Google Maps API 사용
      // 현재는 시뮬레이션을 위한 더미 데이터
      await new Promise((resolve) => setTimeout(resolve, 500)) // API 호출 시뮬레이션

      const addresses = [
        "서울특별시 송파구 잠실동",
        "서울특별시 송파구 잠실역 근처",
        "서울특별시 송파구 롯데월드몰 근처",
        "서울특별시 송파구 잠실새내역 근처",
      ]

      return addresses[Math.floor(Math.random() * addresses.length)]
    } catch (error) {
      throw new Error("주소 변환 실패")
    }
  }

  const getDistanceText = (km: number) => {
    if (km < 1) {
      return `${(km * 1000).toFixed(0)}m`
    }
    return `${km}km`
  }

  const getEstimatedJobs = (km: number) => {
    // 거리에 따른 예상 일자리 수 계산
    const baseJobs = 50
    const jobsPerKm = 25
    return Math.floor(baseJobs + km * jobsPerKm)
  }

  const handleApply = () => {
    const filters = {
      userLocation,
      distance: distance[0],
      estimatedJobs: getEstimatedJobs(distance[0]),
    }
    onApply(filters)
    onClose()
  }

  const handleRetryLocation = () => {
    getCurrentLocation()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle>거리 기반 필터</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Location Error Alert */}
          {locationError && (
            <Alert className="border-yellow-200 bg-yellow-50">
              <AlertCircle className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-yellow-800 text-sm">{locationError}</AlertDescription>
            </Alert>
          )}

          {/* Current Location */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  {isLoadingLocation ? (
                    <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <MapPin className="h-6 w-6 text-blue-600" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-medium">현재 위치</div>
                  <div className="text-sm text-gray-600">
                    {isLoadingLocation ? "위치 확인 중..." : userLocation?.address || "위치를 가져올 수 없습니다"}
                  </div>
                  {locationError && <div className="text-xs text-yellow-600 mt-1">기본 위치가 설정되었습니다</div>}
                </div>
                <Button variant="outline" size="sm" onClick={handleRetryLocation} disabled={isLoadingLocation}>
                  <Navigation className="h-4 w-4 mr-1" />
                  {locationError ? "재시도" : "새로고침"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Distance Slider */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <SliderIcon className="h-4 w-4 text-gray-600" />
              <Label className="text-base font-medium">검색 반경</Label>
            </div>

            <div className="space-y-3">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{getDistanceText(distance[0])}</div>
                <div className="text-sm text-gray-500">반경 내 검색</div>
              </div>

              <Slider value={distance} onValueChange={setDistance} max={10} min={0.5} step={0.5} className="w-full" />

              <div className="flex justify-between text-xs text-gray-500">
                <span>500m</span>
                <span>5km</span>
                <span>10km</span>
              </div>
            </div>
          </div>

          {/* Estimated Results */}
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{getEstimatedJobs(distance[0])}개</div>
                <div className="text-sm text-green-700">예상 일자리 수</div>
                <div className="text-xs text-green-600 mt-1">{distance[0]}km 반경 내 예상 결과입니다</div>
              </div>
            </CardContent>
          </Card>

          {/* Distance Presets */}
          <div>
            <Label className="text-sm font-medium mb-3 block">빠른 선택</Label>
            <div className="grid grid-cols-4 gap-2">
              {[0.5, 1, 2, 5].map((preset) => (
                <Button
                  key={preset}
                  variant={distance[0] === preset ? "default" : "outline"}
                  size="sm"
                  onClick={() => setDistance([preset])}
                  className="text-xs"
                >
                  {getDistanceText(preset)}
                </Button>
              ))}
            </div>
          </div>

          {/* Transportation Info */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">예상 이동 시간</Label>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="text-center p-2 bg-gray-50 rounded">
                <div className="font-medium">🚶‍♂️ 도보</div>
                <div className="text-gray-600">{Math.ceil(distance[0] * 12)}분</div>
              </div>
              <div className="text-center p-2 bg-gray-50 rounded">
                <div className="font-medium">🚴‍♂️ 자전거</div>
                <div className="text-gray-600">{Math.ceil(distance[0] * 4)}분</div>
              </div>
              <div className="text-center p-2 bg-gray-50 rounded">
                <div className="font-medium">🚌 대중교통</div>
                <div className="text-gray-600">{Math.ceil(distance[0] * 3)}분</div>
              </div>
            </div>
          </div>

          {/* Location Permission Guide */}
          {locationError && locationError.includes("거부") && (
            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="p-4">
                <div className="text-sm text-blue-800">
                  <div className="font-medium mb-2">위치 권한 허용 방법:</div>
                  <ol className="list-decimal list-inside space-y-1 text-xs">
                    <li>브라우저 주소창 왼쪽의 자물쇠 아이콘 클릭</li>
                    <li>"위치" 권한을 "허용"으로 변경</li>
                    <li>페이지 새로고침 후 다시 시도</li>
                  </ol>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1 bg-transparent" onClick={onClose}>
              취소
            </Button>
            <Button className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={handleApply} disabled={!userLocation}>
              적용하기
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
