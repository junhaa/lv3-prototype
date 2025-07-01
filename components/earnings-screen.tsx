"use client"

import { useState } from "react"
import { TrendingUp, Download, Filter, CreditCard, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

interface EarningsRecord {
  id: string
  jobTitle: string
  company: string
  date: string
  amount: number
  status: "completed" | "pending" | "processing"
  paymentMethod: "instant" | "bank" | "wallet"
  category: string
}

export function EarningsScreen() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedPeriod, setSelectedPeriod] = useState("this-month")

  const earningsData = {
    thisMonth: {
      total: 580000,
      completed: 520000,
      pending: 60000,
      jobs: 12,
      avgPerJob: 48333,
    },
    lastMonth: {
      total: 420000,
      completed: 420000,
      pending: 0,
      jobs: 9,
      avgPerJob: 46667,
    },
  }

  const recentEarnings: EarningsRecord[] = [
    {
      id: "1",
      jobTitle: "카페 홀서빙",
      company: "스타벅스 홍대점",
      date: "2024.01.15",
      amount: 48000,
      status: "completed",
      paymentMethod: "instant",
      category: "카페/음식점",
    },
    {
      id: "2",
      jobTitle: "전단지 배포",
      company: "치킨마루",
      date: "2024.01.14",
      amount: 36000,
      status: "processing",
      paymentMethod: "bank",
      category: "배달/배송",
    },
    {
      id: "3",
      jobTitle: "이벤트 도우미",
      company: "마케팅회사",
      date: "2024.01.12",
      amount: 90000,
      status: "completed",
      paymentMethod: "instant",
      category: "이벤트",
    },
    {
      id: "4",
      jobTitle: "설거지 및 홀 정리",
      company: "서연카페",
      date: "2024.01.10",
      amount: 25000,
      status: "completed",
      paymentMethod: "wallet",
      category: "카페/음식점",
    },
  ]

  const categoryBreakdown = [
    { category: "카페/음식점", amount: 320000, percentage: 55, jobs: 7 },
    { category: "배달/배송", amount: 150000, percentage: 26, jobs: 3 },
    { category: "이벤트", amount: 90000, percentage: 16, jobs: 1 },
    { category: "생활도움", amount: 20000, percentage: 3, jobs: 1 },
  ]

  const currentData = earningsData.thisMonth
  const growth = ((currentData.total - earningsData.lastMonth.total) / earningsData.lastMonth.total) * 100

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b px-4 py-3 flex items-center justify-between">
        <h1 className="font-bold text-lg">수입 관리</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="bg-transparent">
            <Filter className="h-4 w-4 mr-1" />
            필터
          </Button>
          <Button variant="outline" size="sm" className="bg-transparent">
            <Download className="h-4 w-4 mr-1" />
            내보내기
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
        <TabsList className="grid w-full grid-cols-3 bg-white border-b rounded-none h-12">
          <TabsTrigger value="overview" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600">
            개요
          </TabsTrigger>
          <TabsTrigger value="history" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600">
            내역
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600">
            분석
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-0">
          <div className="p-4 space-y-4">
            {/* Period Selector */}
            <Card>
              <CardContent className="p-4">
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="this-month">이번 달</SelectItem>
                    <SelectItem value="last-month">지난 달</SelectItem>
                    <SelectItem value="this-year">올해</SelectItem>
                    <SelectItem value="custom">기간 설정</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Total Earnings */}
            <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold mb-2">{(currentData.total / 10000).toFixed(0)}만원</div>
                <div className="text-green-100 mb-2">이번 달 총 수입</div>
                <div className="flex items-center justify-center gap-1">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm">전월 대비 +{growth.toFixed(1)}%</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">{currentData.jobs}</div>
                  <div className="text-sm text-gray-600">완료한 일</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">{(currentData.avgPerJob / 1000).toFixed(0)}k</div>
                  <div className="text-sm text-gray-600">평균 수입</div>
                </CardContent>
              </Card>
            </div>

            {/* Payment Status */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">정산 현황</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">완료된 정산</span>
                  <span className="font-medium text-green-600">{(currentData.completed / 10000).toFixed(0)}만원</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">대기 중인 정산</span>
                  <span className="font-medium text-yellow-600">{(currentData.pending / 10000).toFixed(0)}만원</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center font-medium">
                  <span>총 수입</span>
                  <span>{(currentData.total / 10000).toFixed(0)}만원</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-12 bg-transparent">
                <CreditCard className="h-4 w-4 mr-2" />
                출금하기
              </Button>
              <Button variant="outline" className="h-12 bg-transparent">
                <Wallet className="h-4 w-4 mr-2" />
                지갑 관리
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="history" className="mt-0">
          <div className="p-4 space-y-3">
            {recentEarnings.map((earning) => (
              <EarningsCard key={earning.id} earning={earning} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="mt-0">
          <div className="p-4 space-y-4">
            {/* Monthly Trend */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">월별 수입 추이</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-32 bg-gray-100 rounded-lg flex items-end justify-around p-4">
                  {["10월", "11월", "12월", "1월"].map((month, index) => {
                    const heights = [40, 60, 45, 80]
                    return (
                      <div key={month} className="flex flex-col items-center">
                        <div className="bg-green-500 rounded-t w-8 mb-2" style={{ height: `${heights[index]}px` }} />
                        <span className="text-xs text-gray-600">{month}</span>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Category Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">카테고리별 수입</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {categoryBreakdown.map((item) => (
                  <div key={item.category}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{item.category}</span>
                      <span className="font-medium">{(item.amount / 10000).toFixed(0)}만원</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: `${item.percentage}%` }} />
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{item.jobs}개 일자리</div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">수입 성과</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">시간당 평균 수입</span>
                  <span className="font-medium">12,500원</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">최고 일일 수입</span>
                  <span className="font-medium">90,000원</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">연속 근무일</span>
                  <span className="font-medium">5일</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function EarningsCard({ earning }: { earning: EarningsRecord }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "정산완료"
      case "pending":
        return "정산대기"
      case "processing":
        return "처리중"
      default:
        return "알 수 없음"
    }
  }

  const getPaymentMethodText = (method: string) => {
    switch (method) {
      case "instant":
        return "즉시지급"
      case "bank":
        return "계좌이체"
      case "wallet":
        return "앱 지갑"
      default:
        return "기타"
    }
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <div className="font-medium text-sm">{earning.jobTitle}</div>
            <div className="text-xs text-gray-500">{earning.company}</div>
            <div className="text-xs text-gray-500">{earning.date}</div>
          </div>
          <div className="text-right">
            <div className="font-bold text-lg">{earning.amount.toLocaleString()}원</div>
            <Badge className={getStatusColor(earning.status)} variant="secondary">
              {getStatusText(earning.status)}
            </Badge>
          </div>
        </div>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <Badge variant="outline">{earning.category}</Badge>
          <span>{getPaymentMethodText(earning.paymentMethod)}</span>
        </div>
      </CardContent>
    </Card>
  )
}
