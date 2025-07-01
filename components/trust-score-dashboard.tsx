"use client"

import { useState } from "react"
import { TrendingUp, Award, Shield, Star, Users, Clock, CheckCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"

interface TrustMetrics {
  overallScore: number
  totalReviews: number
  categoryScores: {
    punctuality: number
    communication: number
    workQuality: number
    attitude: number
  }
  badges: string[]
  recentTrend: "up" | "down" | "stable"
  rankPercentile: number
}

export function TrustScoreDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  const trustMetrics: TrustMetrics = {
    overallScore: 4.8,
    totalReviews: 23,
    categoryScores: {
      punctuality: 4.9,
      communication: 4.7,
      workQuality: 4.8,
      attitude: 4.9,
    },
    badges: ["신뢰왕", "시간지킴이", "소통왕"],
    recentTrend: "up",
    rankPercentile: 95,
  }

  const improvementTips = [
    {
      category: "소통 능력",
      currentScore: 4.7,
      tip: "업무 시작 전 구인자와 세부사항을 미리 확인해보세요",
      impact: "+0.2점 예상",
    },
    {
      category: "업무 품질",
      currentScore: 4.8,
      tip: "완료 후 간단한 정리나 청소를 추가로 해보세요",
      impact: "+0.1점 예상",
    },
  ]

  const competitorComparison = [
    { metric: "전체 평점", myScore: 4.8, average: 4.3, percentile: 85 },
    { metric: "시간 준수", myScore: 4.9, average: 4.1, percentile: 92 },
    { metric: "소통 능력", myScore: 4.7, average: 4.2, percentile: 78 },
    { metric: "업무 품질", myScore: 4.8, average: 4.4, percentile: 81 },
  ]

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b px-4 py-3">
        <h1 className="font-bold text-lg">신뢰도 대시보드</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
        <TabsList className="grid w-full grid-cols-3 bg-white border-b rounded-none h-12">
          <TabsTrigger value="overview" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600">
            개요
          </TabsTrigger>
          <TabsTrigger value="analysis" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600">
            분석
          </TabsTrigger>
          <TabsTrigger value="improvement" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600">
            개선
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-0">
          <div className="p-4 space-y-4">
            {/* Overall Score */}
            <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold mb-2">{trustMetrics.overallScore}</div>
                <div className="flex justify-center gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 fill-white text-white" />
                  ))}
                </div>
                <div className="text-blue-100">총 {trustMetrics.totalReviews}개 평가</div>
                <div className="flex items-center justify-center gap-1 mt-2">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm">상위 {100 - trustMetrics.rankPercentile}%</span>
                </div>
              </CardContent>
            </Card>

            {/* Category Scores */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">세부 평가 점수</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(trustMetrics.categoryScores).map(([key, score]) => {
                  const labels = {
                    punctuality: "시간 준수",
                    communication: "소통 능력",
                    workQuality: "업무 품질",
                    attitude: "태도",
                  }
                  return (
                    <div key={key}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{labels[key as keyof typeof labels]}</span>
                        <span className="font-medium">{score}</span>
                      </div>
                      <Progress value={(score / 5) * 100} className="h-2" />
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            {/* Badges */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">획득한 뱃지</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {trustMetrics.badges.map((badge) => (
                    <Badge key={badge} className="bg-yellow-100 text-yellow-800 border-yellow-300">
                      <Award className="h-3 w-3 mr-1" />
                      {badge}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Trust Benefits */}
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-base text-green-800">신뢰도 혜택</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-green-700">
                  <CheckCircle className="h-4 w-4" />
                  <span>우선 매칭 기회 제공</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-green-700">
                  <CheckCircle className="h-4 w-4" />
                  <span>프리미엄 일자리 접근</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-green-700">
                  <CheckCircle className="h-4 w-4" />
                  <span>수수료 할인 혜택</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analysis" className="mt-0">
          <div className="p-4 space-y-4">
            {/* Trend Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">최근 30일 트렌드</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <TrendingUp className="h-8 w-8 text-green-500 mx-auto mb-2" />
                    <div className="text-sm font-medium text-green-600">+0.3점 상승</div>
                    <div className="text-xs text-gray-500">지난 달 대비</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Comparison with Others */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">동일 경력자 대비</CardTitle>
                <CardDescription>비슷한 경험을 가진 다른 사용자들과의 비교</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {competitorComparison.map((item) => (
                  <div key={item.metric}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{item.metric}</span>
                      <span className="font-medium">
                        {item.myScore} vs {item.average}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={item.percentile} className="flex-1 h-2" />
                      <span className="text-xs text-gray-500">{item.percentile}%</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Review Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">평가 분포</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => {
                  const count = rating === 5 ? 18 : rating === 4 ? 4 : rating === 3 ? 1 : 0
                  const percentage = (count / trustMetrics.totalReviews) * 100
                  return (
                    <div key={rating} className="flex items-center gap-2 text-sm">
                      <span className="w-8">{rating}점</span>
                      <Progress value={percentage} className="flex-1 h-2" />
                      <span className="w-8 text-right">{count}</span>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="improvement" className="mt-0">
          <div className="p-4 space-y-4">
            {/* Improvement Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">개선 제안</CardTitle>
                <CardDescription>AI가 분석한 맞춤형 개선 방안</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {improvementTips.map((tip, index) => (
                  <div key={index} className="p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">{tip.category}</span>
                      <Badge variant="outline" className="text-xs">
                        {tip.impact}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{tip.tip}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Next Badge Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">다음 뱃지까지</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Users className="h-8 w-8 text-purple-600" />
                  </div>
                  <div className="font-medium">인기왕 뱃지</div>
                  <div className="text-sm text-gray-500">30개 이상의 5점 평가 필요</div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>진행률</span>
                    <span>18/30</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Action Items */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">실행 계획</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <div className="flex-1">
                    <div className="font-medium text-sm">업무 전 소통 강화</div>
                    <div className="text-xs text-gray-500">시작 전 세부사항 확인하기</div>
                  </div>
                  <Button size="sm" variant="outline" className="bg-transparent">
                    설정
                  </Button>
                </div>

                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <Shield className="h-5 w-5 text-green-600" />
                  <div className="flex-1">
                    <div className="font-medium text-sm">추가 서비스 제공</div>
                    <div className="text-xs text-gray-500">기본 업무 외 정리 정돈</div>
                  </div>
                  <Button size="sm" variant="outline" className="bg-transparent">
                    알림
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
