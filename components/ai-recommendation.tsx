"use client"

import { useState, useEffect } from "react"
import { Sparkles, TrendingUp, Clock, MapPin, Star } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface RecommendedJob {
  id: string
  title: string
  company: string
  location: string
  hourlyPay: number
  duration: string
  matchScore: number
  reasons: string[]
  rating: number
  reviews: number
  urgent?: boolean
}

export function AIRecommendation() {
  const [recommendations, setRecommendations] = useState<RecommendedJob[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // AI 추천 로직 시뮬레이션
    setTimeout(() => {
      setRecommendations([
        {
          id: "ai-1",
          title: "스타벅스 바리스타",
          company: "스타벅스 홍대점",
          location: "홍익대학교 근처",
          hourlyPay: 15000,
          duration: "4시간",
          matchScore: 95,
          reasons: ["카페 경험 보유", "커피 관련 관심사", "근거리 위치"],
          rating: 4.8,
          reviews: 32,
        },
        {
          id: "ai-2",
          title: "편의점 야간 알바",
          company: "CU 홍대입구점",
          location: "도보 5분",
          hourlyPay: 12000,
          duration: "8시간",
          matchScore: 88,
          reasons: ["야간 근무 선호", "편의점 경험", "높은 시급"],
          rating: 4.5,
          reviews: 18,
          urgent: true,
        },
        {
          id: "ai-3",
          title: "과외 수학 선생님",
          company: "개인과외",
          location: "온라인/오프라인",
          hourlyPay: 25000,
          duration: "2시간",
          matchScore: 82,
          reasons: ["수학 전공", "과외 경험", "높은 수익성"],
          rating: 4.9,
          reviews: 12,
        },
      ])
      setIsLoading(false)
    }, 2000)
  }, [])

  if (isLoading) {
    return (
      <Card className="border-purple-200 bg-purple-50">
        <CardContent className="p-6 text-center">
          <Sparkles className="h-8 w-8 text-purple-600 mx-auto mb-4 animate-spin" />
          <div className="text-purple-800 font-medium mb-2">AI가 맞춤 일자리를 찾고 있어요</div>
          <div className="text-sm text-purple-600">잠시만 기다려주세요...</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-800">
            <Sparkles className="h-5 w-5" />
            AI 맞춤 추천
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-purple-700 mb-4">
            당신의 프로필과 관심사를 분석하여 최적의 일자리를 추천해드려요
          </div>
        </CardContent>
      </Card>

      {recommendations.map((job) => (
        <Card key={job.id} className="border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Badge className="bg-purple-100 text-purple-800">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {job.matchScore}% 매칭
                  </Badge>
                  {job.urgent && <Badge className="bg-red-500 text-white">긴급</Badge>}
                </div>
                <h3 className="font-bold text-lg">{job.title}</h3>
                <p className="text-gray-600 text-sm">{job.company}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600">{job.hourlyPay.toLocaleString()}원</div>
                <div className="text-xs text-gray-500">시급</div>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{job.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span>
                    {job.rating} ({job.reviews})
                  </span>
                </div>
              </div>

              <div>
                <div className="text-sm font-medium text-gray-700 mb-1">추천 이유:</div>
                <div className="flex flex-wrap gap-1">
                  {job.reasons.map((reason, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {reason}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>매칭도</span>
                  <span className="font-medium">{job.matchScore}%</span>
                </div>
                <Progress value={job.matchScore} className="h-2" />
              </div>
            </div>

            <Button className="w-full bg-purple-600 hover:bg-purple-700">지원하기</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
