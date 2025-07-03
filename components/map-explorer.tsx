"use client"

import { useState } from "react"
import { ArrowLeft, MapPin, Navigation, Filter, List, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

interface MapExplorerProps {
  onBack: () => void
}

export function MapExplorer({ onBack }: MapExplorerProps) {
  const [selectedJob, setSelectedJob] = useState<any>(null)
  const [viewMode, setViewMode] = useState<"map" | "list">("map")

  const jobs = [
    {
      id: 1,
      title: "스타벅스 바리스타",
      company: "스타벅스 홍대점",
      hourlyPay: 15000,
      location: "홍익대학교 근처",
      distance: "0.3km",
      rating: 4.8,
      reviews: 32,
      urgent: false,
      coordinates: { x: 30, y: 40 },
    },
    {
      id: 2,
      title: "편의점 야간 알바",
      company: "CU 홍대입구점",
      hourlyPay: 12000,
      location: "도보 5분",
      distance: "0.5km",
      rating: 4.5,
      reviews: 18,
      urgent: true,
      coordinates: { x: 60, y: 30 },
    },
    {
      id: 3,
      title: "카페 홀서빙",
      company: "투썸플레이스",
      hourlyPay: 13000,
      location: "신촌역 근처",
      distance: "0.8km",
      rating: 4.6,
      reviews: 24,
      urgent: false,
      coordinates: { x: 45, y: 60 },
    },
  ]

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen pb-16">
      {/* Header */}
      <div className="bg-white border-b px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="font-bold text-lg">지도 탐색</h1>
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

      {/* Search Bar */}
      <div className="bg-white p-4 border-b">
        <div className="flex gap-2">
          <Input placeholder="지역, 업체명으로 검색" className="flex-1" />
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {viewMode === "map" ? (
        <>
          {/* Map View */}
          <div className="relative h-96 bg-gray-100 border-b">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">지도 로딩 중...</p>
              </div>
            </div>

            {/* Job Markers */}
            {jobs.map((job) => (
              <div
                key={job.id}
                className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${job.coordinates.x}%`,
                  top: `${job.coordinates.y}%`,
                }}
                onClick={() => setSelectedJob(job)}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg ${
                    job.urgent ? "bg-red-500" : "bg-blue-500"
                  } ${selectedJob?.id === job.id ? "ring-4 ring-white" : ""}`}
                >
                  {(job.hourlyPay / 1000).toFixed(0)}k
                </div>
              </div>
            ))}

            {/* Current Location */}
            <div className="absolute bottom-4 right-4">
              <Button size="icon" className="rounded-full bg-blue-600 hover:bg-blue-700">
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
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      <Navigation className="h-3 w-3 mr-1" />
                      길찾기
                    </Button>
                    <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
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
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    지원하기
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
