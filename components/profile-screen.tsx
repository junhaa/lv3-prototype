"use client"

import { useState } from "react"
import { Star, Shield, CheckCircle, Edit, Camera, Award, Clock, AwardIcon as Won } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

export function ProfileScreen() {
  const [userType, setUserType] = useState<"worker" | "employer">("worker")

  const workerStats = {
    rating: 4.8,
    completedJobs: 23,
    totalEarnings: 580000,
    noShowRate: 0,
    responseRate: 98,
  }

  const recentJobs = [
    {
      title: "카페 홀서빙",
      company: "스타벅스 홍대점",
      date: "2024.01.15",
      pay: "24,000원",
      rating: 5,
      review: "성실하고 친절하게 일해주셨어요!",
    },
    {
      title: "전단지 배포",
      company: "치킨마루",
      date: "2024.01.12",
      pay: "30,000원",
      rating: 5,
      review: "시간 약속을 잘 지키시네요.",
    },
  ]

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b px-4 py-3">
        <h1 className="font-bold text-lg">내 프로필</h1>
      </div>

      <div className="p-4 space-y-4">
        {/* Profile Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Avatar className="w-16 h-16">
                  <AvatarImage src="/placeholder.svg?height=64&width=64" />
                  <AvatarFallback>김민준</AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-blue-600 hover:bg-blue-700"
                >
                  <Camera className="h-3 w-3" />
                </Button>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="font-bold text-lg">김민준</h2>
                  <Button variant="ghost" size="icon" className="w-6 h-6">
                    <Edit className="h-3 w-3" />
                  </Button>
                </div>
                <p className="text-sm text-gray-600">경제학과 3학년</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{workerStats.rating}</span>
                  <span className="text-sm text-gray-500">({workerStats.completedJobs}개 후기)</span>
                </div>
              </div>
            </div>

            {/* Verification Status */}
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>휴대폰 인증 완료</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>계좌 인증 완료</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Shield className="h-4 w-4 text-blue-500" />
                <span>신원 인증 완료</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-3">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{workerStats.completedJobs}</div>
              <div className="text-sm text-gray-600">완료한 일</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {(workerStats.totalEarnings / 10000).toFixed(0)}만원
              </div>
              <div className="text-sm text-gray-600">총 수입</div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">신뢰도 지표</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>노쇼율</span>
                <span className="font-medium text-green-600">{workerStats.noShowRate}%</span>
              </div>
              <Progress value={100 - workerStats.noShowRate} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>응답률</span>
                <span className="font-medium">{workerStats.responseRate}%</span>
              </div>
              <Progress value={workerStats.responseRate} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Skills & Tags */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">보유 기술</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">카페 경험</Badge>
              <Badge variant="secondary">친절한 서비스</Badge>
              <Badge variant="secondary">시간 준수</Badge>
              <Badge variant="secondary">책임감</Badge>
              <Button variant="outline" size="sm" className="h-6 text-xs bg-transparent">
                + 추가
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Reviews */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">최근 받은 후기</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentJobs.map((job, index) => (
              <div key={index}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-medium text-sm">{job.title}</div>
                    <div className="text-xs text-gray-500">
                      {job.company} · {job.date}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{job.pay}</div>
                    <div className="flex items-center gap-1">
                      {[...Array(job.rating)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">"{job.review}"</p>
                {index < recentJobs.length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Achievement Badges */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">획득한 뱃지</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-1">
                  <Award className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="text-xs">신뢰왕</div>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-1">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-xs">시간지킴이</div>
              </div>

              <div className="text-center opacity-50">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-1">
                  <Won className="h-6 w-6 text-gray-400" />
                </div>
                <div className="text-xs">수입왕</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button variant="outline" className="w-full bg-transparent">
            프로필 수정
          </Button>
          <Button variant="outline" className="w-full bg-transparent">
            내 활동 내역
          </Button>
          <Button variant="outline" className="w-full bg-transparent">
            설정
          </Button>
        </div>
      </div>
    </div>
  )
}
