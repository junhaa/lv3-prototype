"use client"

import { useState } from "react"
import { ArrowLeft, MapPin, Clock, Star, Phone, Heart } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface FavoritesScreenProps {
  onJobSelect: (job: any) => void
  onContactOpen: () => void
  onBack: () => void
}

export function FavoritesScreen({ onJobSelect, onContactOpen, onBack }: FavoritesScreenProps) {
  const [favoriteJobs] = useState([
    {
      id: 1,
      title: "긴급) 설거지 및 홀 정리",
      company: "서연카페",
      location: "도보 10분",
      duration: "2시간",
      totalPay: 25000,
      workTime: "오늘 14:00 ~ 16:00",
      rating: 4.8,
      reviews: 23,
      urgent: true,
      distance: "0.8km",
      description: "설거지 및 홀 정리 업무입니다. 초보자도 가능합니다.",
      requirements: ["성실한 분", "시간 준수"],
      employer: {
        name: "박서연",
        rating: 4.8,
        reviews: 23,
        verified: true,
        phone: "010-1234-5678",
        email: "seoyeon@cafe.com",
      },
    },
    {
      id: 3,
      title: "이케아 책장 조립 도움",
      company: "박현우님",
      location: "도보 15분",
      duration: "1-2시간",
      totalPay: 40000,
      workTime: "내일 10:00 ~ 12:00",
      rating: 4.9,
      reviews: 8,
      urgent: false,
      distance: "1.2km",
      category: "생활도움",
      description: "이케아 책장 조립을 도와주실 분을 찾습니다.",
      requirements: ["조립 경험자 우대", "공구 사용 가능한 분"],
      employer: {
        name: "박현우",
        rating: 4.9,
        reviews: 8,
        verified: true,
        email: "hyunwoo@gmail.com",
      },
    },
  ])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-4 py-3 flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="font-bold text-lg">관심 목록</h1>
          <p className="text-sm text-gray-500">{favoriteJobs.length}개의 일자리</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {favoriteJobs.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <div className="text-gray-500 mb-2">관심 있는 일자리가 없습니다</div>
              <p className="text-sm text-gray-400">일자리 목록에서 하트를 눌러 관심 목록에 추가해보세요</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {favoriteJobs.map((job) => (
              <Card
                key={job.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => onJobSelect(job)}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {job.urgent && <Badge className="bg-red-500 text-white text-xs px-2 py-0">긴급</Badge>}
                        {job.category && (
                          <Badge variant="outline" className="text-xs">
                            {job.category}
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-base">{job.title}</CardTitle>
                      <CardDescription className="text-sm">{job.company}</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <div className="font-bold text-green-600 text-lg">{job.totalPay.toLocaleString()}원</div>
                        <div className="text-xs text-gray-500">건당</div>
                        <div className="text-xs text-gray-400">{job.duration}</div>
                      </div>
                      <Button variant="ghost" size="icon" className="text-red-500">
                        <Heart className="h-4 w-4 fill-current" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{job.workTime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{job.rating}</span>
                        <span>({job.reviews})</span>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-transparent"
                        onClick={(e) => {
                          e.stopPropagation()
                          onContactOpen()
                        }}
                      >
                        <Phone className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={(e) => {
                          e.stopPropagation()
                          onJobSelect(job)
                        }}
                      >
                        지원하기
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
