"use client"

import { useState, useEffect, useRef } from "react"
import { ArrowLeft, Navigation, Filter, List, Star, MapPin, Phone, MessageCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface RealMapViewProps {
  onBack: () => void
  jobs: any[]
  onJobSelect: (job: any) => void
}

export function RealMapView({ onBack, jobs, onJobSelect }: RealMapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<any>(null)
  const [selectedJob, setSelectedJob] = useState<any>(null)
  const [viewMode, setViewMode] = useState<"map" | "list">("map")
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [locationError, setLocationError] = useState<string | null>(null)
  const [isLoadingLocation, setIsLoadingLocation] = useState(false)
  const [leafletLoaded, setLeafletLoaded] = useState(false)

  useEffect(() => {
    getCurrentLocation()
    loadLeaflet()
  }, [])

  const loadLeaflet = () => {
    // Leaflet CSS 로드
    if (!document.querySelector('link[href*="leaflet"]')) {
      const link = document.createElement("link")
      link.rel = "stylesheet"
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      document.head.appendChild(link)
    }

    // Leaflet JS 로드
    if (!window.L) {
      const script = document.createElement("script")
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
      script.onload = () => {
        setLeafletLoaded(true)
      }
      document.head.appendChild(script)
    } else {
      setLeafletLoaded(true)
    }
  }

  const getCurrentLocation = () => {
    setIsLoadingLocation(true)
    setLocationError(null)

    if (!navigator.geolocation) {
      setLocationError("이 브라우저는 위치 정보를 지원하지 않습니다.")
      setDefaultLocation()
      return
    }

    const options = {
      enableHighAccuracy: false,
      timeout: 10000,
      maximumAge: 300000,
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
        setIsLoadingLocation(false)
        setLocationError(null)
      },
      (error) => {
        console.warn("위치 정보 가져오기 실패:", error)

        let errorMessage = ""
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "위치 정보 접근이 거부되었습니다."
            break
          case error.POSITION_UNAVAILABLE:
            errorMessage = "위치 정보를 사용할 수 없습니다."
            break
          case error.TIMEOUT:
            errorMessage = "위치 정보 요청 시간이 초과되었습니다."
            break
          default:
            errorMessage = "위치 정보를 가져올 수 없습니다."
            break
        }

        setLocationError(errorMessage)
        setDefaultLocation()
      },
      options,
    )
  }

  const setDefaultLocation = () => {
    // 기본 위치를 잠실로 변경 (잠실역 좌표)
    setUserLocation({
      lat: 37.5133,
      lng: 127.1028,
    })
    setIsLoadingLocation(false)
  }

  useEffect(() => {
    if (!userLocation || !mapRef.current || !leafletLoaded || !window.L) return

    initializeMap()
  }, [userLocation, jobs, leafletLoaded])

  const initializeMap = () => {
    if (!window.L || !mapRef.current) return

    // 기존 지도가 있다면 제거
    if (map) {
      map.remove()
    }

    // OpenStreetMap으로 지도 초기화
    const leafletMap = window.L.map(mapRef.current).setView([userLocation!.lat, userLocation!.lng], 15)

    // OpenStreetMap 타일 레이어 추가
    window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(leafletMap)

    // 현재 위치 마커 추가
    const currentLocationIcon = window.L.divIcon({
      className: "current-location-marker",
      html: '<div style="background: #3b82f6; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>',
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    })

    window.L.marker([userLocation!.lat, userLocation!.lng], { icon: currentLocationIcon })
      .addTo(leafletMap)
      .bindPopup("현재 위치")

    // 일자리 마커들 추가
    jobs.forEach((job, index) => {
      // 잠실 주변의 랜덤 위치 생성
      const lat = userLocation!.lat + (Math.random() - 0.5) * 0.01
      const lng = userLocation!.lng + (Math.random() - 0.5) * 0.01

      const jobIcon = window.L.divIcon({
        className: "job-marker",
        html: `<div style="background: ${job.urgent ? "#ef4444" : "#3b82f6"}; color: white; padding: 4px 8px; border-radius: 12px; font-size: 12px; font-weight: bold; white-space: nowrap; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">${(job.hourlyPay / 1000).toFixed(0)}k</div>`,
        iconSize: [40, 24],
        iconAnchor: [20, 12],
      })

      const marker = window.L.marker([lat, lng], { icon: jobIcon })
        .addTo(leafletMap)
        .bindPopup(`
          <div style="min-width: 200px;">
            <h3 style="margin: 0 0 8px 0; font-size: 14px; font-weight: bold;">${job.title}</h3>
            <p style="margin: 0 0 4px 0; font-size: 12px; color: #666;">${job.company}</p>
            <p style="margin: 0 0 8px 0; font-size: 14px; font-weight: bold; color: #059669;">${job.hourlyPay.toLocaleString()}원/시간</p>
            <button onclick="window.selectJob(${job.id})" style="background: #3b82f6; color: white; border: none; padding: 6px 12px; border-radius: 6px; font-size: 12px; cursor: pointer;">상세보기</button>
          </div>
        `)

      marker.on("click", () => {
        setSelectedJob(job)
      })
    })

    // 전역 함수로 job 선택 함수 등록
    window.selectJob = (jobId: number) => {
      const job = jobs.find((j) => j.id === jobId)
      if (job) {
        setSelectedJob(job)
      }
    }

    setMap(leafletMap)
  }

  const handleNavigation = (job: any) => {
    if (userLocation) {
      // OpenStreetMap 기반 길찾기 (실제로는 외부 앱 연동)
      const url = `https://www.openstreetmap.org/directions?from=${userLocation.lat},${userLocation.lng}&to=${userLocation.lat + Math.random() * 0.01},${userLocation.lng + Math.random() * 0.01}`

      alert(`길찾기: ${job.title}로 이동합니다.\n실제 환경에서는 지도 앱이 열립니다.`)
      // window.open(url, "_blank")
    }
  }

  const handleRetryLocation = () => {
    getCurrentLocation()
  }

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen pb-16">
      {/* Header */}
      <div className="bg-white border-b px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="font-bold text-lg">실시간 지도</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant={viewMode === "map" ? "default" : "outline"} size="sm" onClick={() => setViewMode("map")}>
            <MapPin className="h-4 w-4 mr-1" />
            지도
          </Button>
          <Button variant={viewMode === "list" ? "default" : "outline"} size="sm" onClick={() => setViewMode("list")}>
            <List className="h-4 w-4 mr-1" />
            목록
          </Button>
        </div>
      </div>

      {/* Location Error Alert */}
      {locationError && (
        <div className="p-4">
          <Alert className="border-yellow-200 bg-yellow-50">
            <AlertCircle className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-800 text-sm">
              {locationError} 기본 위치(잠실)로 설정되었습니다.
              <Button
                variant="link"
                size="sm"
                className="p-0 h-auto ml-2 text-yellow-800 underline"
                onClick={handleRetryLocation}
              >
                다시 시도
              </Button>
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Search Bar */}
      <div className="bg-white p-4 border-b">
        <div className="flex gap-2">
          <Input placeholder="업체명, 업무로 검색" className="flex-1" />
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {viewMode === "map" ? (
        <>
          {/* Map Container */}
          <div className="h-96 bg-gray-100 border-b relative">
            {isLoadingLocation || !leafletLoaded ? (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
                <div className="text-center">
                  <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                  <p className="text-sm text-gray-500">{isLoadingLocation ? "위치 확인 중..." : "지도 로딩 중..."}</p>
                </div>
              </div>
            ) : null}

            <div ref={mapRef} className="w-full h-full" />

            {/* Current Location Button */}
            <div className="absolute bottom-4 right-4 z-10">
              <Button
                size="icon"
                className="rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg"
                onClick={handleRetryLocation}
                disabled={isLoadingLocation}
              >
                <Navigation className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Selected Job Info */}
          {selectedJob && (
            <div className="p-4 bg-white border-b">
              <Card className="border-blue-200">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {selectedJob.urgent && <Badge className="bg-red-500 text-white">긴급</Badge>}
                      </div>
                      <h3 className="font-bold">{selectedJob.title}</h3>
                      <p className="text-sm text-gray-600">{selectedJob.company}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-green-600">{selectedJob.hourlyPay.toLocaleString()}원</div>
                      <div className="text-xs text-gray-500">시급</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span>{selectedJob.distance}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span>
                        {selectedJob.rating} ({selectedJob.reviews})
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 bg-transparent"
                      onClick={() => handleNavigation(selectedJob)}
                    >
                      <Navigation className="h-3 w-3 mr-1" />
                      길찾기
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      <Phone className="h-3 w-3 mr-1" />
                      연락
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                      onClick={() => onJobSelect(selectedJob)}
                    >
                      지원하기
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </>
      ) : (
        /* List View */
        <div className="p-4 space-y-3">
          {jobs.map((job) => (
            <Card key={job.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {job.urgent && <Badge className="bg-red-500 text-white">긴급</Badge>}
                    </div>
                    <h3 className="font-bold">{job.title}</h3>
                    <p className="text-sm text-gray-600">{job.company}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-green-600">{job.hourlyPay.toLocaleString()}원</div>
                    <div className="text-xs text-gray-500">시급</div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span>{job.distance}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span>
                        {job.rating} ({job.reviews})
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button size="sm" variant="outline" className="bg-transparent">
                      <MessageCircle className="h-3 w-3" />
                    </Button>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      지원
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
