"use client"

import { useState } from "react"
import { Star, ThumbsUp, Flag, Send, Shield, User, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

interface ReviewData {
  id: string
  jobTitle: string
  reviewerName: string
  reviewerRole: "worker" | "employer"
  revieweeRole: "worker" | "employer"
  date: string
  overallRating: number
  categories: {
    [key: string]: number
  }
  comment: string
  photos?: string[]
  helpful: number
  reported: boolean
}

export function RoleBasedReviewSystem() {
  const [activeTab, setActiveTab] = useState("write")
  const [userRole] = useState<"worker" | "employer">("worker") // 실제로는 로그인한 사용자 정보에서 가져옴

  const workerCategories = {
    punctuality: "시간 준수",
    communication: "소통 능력",
    workQuality: "업무 품질",
    attitude: "태도",
    reliability: "신뢰성",
  }

  const employerCategories = {
    clarity: "업무 설명",
    payment: "정산 신속성",
    workplace: "근무 환경",
    communication: "소통 능력",
    fairness: "공정성",
  }

  const getCurrentCategories = (role: "worker" | "employer") => {
    return role === "worker" ? workerCategories : employerCategories
  }

  const recentReviews: ReviewData[] = [
    {
      id: "1",
      jobTitle: "카페 홀서빙",
      reviewerName: "서연카페",
      reviewerRole: "employer",
      revieweeRole: "worker",
      date: "2024.01.15",
      overallRating: 5,
      categories: {
        punctuality: 5,
        communication: 4,
        workQuality: 5,
        attitude: 5,
        reliability: 5,
      },
      comment: "시간 약속을 잘 지키시고 성실하게 일해주셨어요. 손님들에게도 친절하게 응대해주셔서 만족스러웠습니다.",
      helpful: 12,
      reported: false,
    },
    {
      id: "2",
      jobTitle: "전단지 배포",
      reviewerName: "김민준",
      reviewerRole: "worker",
      revieweeRole: "employer",
      date: "2024.01.12",
      overallRating: 4,
      categories: {
        clarity: 4,
        payment: 5,
        workplace: 4,
        communication: 4,
        fairness: 4,
      },
      comment: "업무 설명을 자세히 해주셨고 약속한 시간에 정산해주셨어요. 다만 업무량이 예상보다 많았습니다.",
      helpful: 8,
      reported: false,
    },
  ]

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b px-4 py-3">
        <h1 className="font-bold text-lg">평가 시스템</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
        <TabsList className="grid w-full grid-cols-3 bg-white border-b rounded-none h-12">
          <TabsTrigger value="write" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600">
            평가 작성
          </TabsTrigger>
          <TabsTrigger value="received" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600">
            받은 평가
          </TabsTrigger>
          <TabsTrigger value="given" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600">
            작성한 평가
          </TabsTrigger>
        </TabsList>

        <TabsContent value="write" className="mt-0">
          <div className="p-4 space-y-4">
            {/* Role Indicator */}
            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  {userRole === "worker" ? (
                    <User className="h-5 w-5 text-blue-600" />
                  ) : (
                    <Briefcase className="h-5 w-5 text-blue-600" />
                  )}
                  <div>
                    <div className="font-medium text-blue-800">
                      {userRole === "worker" ? "구직자" : "구인자"}로 평가 작성
                    </div>
                    <div className="text-sm text-blue-600">
                      {userRole === "worker" ? "고용주를 평가해주세요" : "근로자를 평가해주세요"}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pending Reviews */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">평가 대기 중</CardTitle>
                <CardDescription>완료된 업무에 대한 평가를 작성해주세요</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-sm">카페 홀서빙</div>
                    <div className="text-xs text-gray-500">서연카페 · 2024.01.15</div>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        평가하기
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md mx-auto max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>평가 작성</DialogTitle>
                      </DialogHeader>
                      <RoleBasedReviewForm userRole={userRole} />
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>

            {/* Review Guidelines */}
            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <div className="font-medium text-blue-800 mb-1">공정한 평가 가이드라인</div>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• 객관적이고 구체적인 내용으로 작성해주세요</li>
                      <li>• 개인적인 감정보다는 업무 관련 내용을 중심으로</li>
                      <li>• 허위 정보나 악의적 평가는 제재 대상입니다</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="received" className="mt-0">
          <div className="p-4 space-y-4">
            {/* Trust Score Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">내 신뢰도 점수</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-blue-600">4.8</div>
                  <div className="flex justify-center gap-1 my-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <div className="text-sm text-gray-600">총 23개 평가</div>
                </div>

                <div className="space-y-3">
                  {Object.entries(getCurrentCategories(userRole)).map(([key, label]) => (
                    <div key={key}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{label}</span>
                        <span className="font-medium">4.8</span>
                      </div>
                      <Progress value={96} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Reviews */}
            <div className="space-y-3">
              {recentReviews
                .filter((review) => review.revieweeRole === userRole)
                .map((review) => (
                  <ReviewCard key={review.id} review={review} userRole={userRole} />
                ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="given" className="mt-0">
          <div className="p-4 space-y-3">
            {recentReviews
              .filter((review) => review.reviewerRole === userRole)
              .map((review) => (
                <ReviewCard key={review.id} review={review} userRole={userRole} showEdit />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function RoleBasedReviewForm({ userRole }: { userRole: "worker" | "employer" }) {
  const [rating, setRating] = useState(5)
  const [categories, setCategories] = useState<{ [key: string]: number }>({})
  const [comment, setComment] = useState("")

  const workerCategories = {
    punctuality: "시간 준수",
    communication: "소통 능력",
    workQuality: "업무 품질",
    attitude: "태도",
    reliability: "신뢰성",
  }

  const employerCategories = {
    clarity: "업무 설명",
    payment: "정산 신속성",
    workplace: "근무 환경",
    communication: "소통 능력",
    fairness: "공정성",
  }

  const currentCategories = userRole === "worker" ? employerCategories : workerCategories

  const handleSubmit = () => {
    // 평가 제출 로직
  }

  return (
    <div className="space-y-6">
      {/* Overall Rating */}
      <div>
        <label className="block text-sm font-medium mb-2">전체 평가</label>
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button key={star} onClick={() => setRating(star)} className="focus:outline-none">
              <Star className={`h-8 w-8 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
            </button>
          ))}
          <span className="ml-2 font-medium">{rating}.0</span>
        </div>
      </div>

      {/* Category Ratings */}
      <div className="space-y-4">
        <label className="block text-sm font-medium">세부 평가</label>
        {Object.entries(currentCategories).map(([key, label]) => (
          <div key={key}>
            <div className="flex justify-between text-sm mb-2">
              <span>{label}</span>
              <span className="font-medium">{categories[key] || 5}.0</span>
            </div>
            <Slider
              value={[categories[key] || 5]}
              onValueChange={(value) => setCategories((prev) => ({ ...prev, [key]: value[0] }))}
              max={5}
              min={1}
              step={1}
              className="w-full"
            />
          </div>
        ))}
      </div>

      {/* Comment */}
      <div>
        <label className="block text-sm font-medium mb-2">상세 후기</label>
        <Textarea
          placeholder="구체적이고 객관적인 후기를 작성해주세요..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="min-h-[100px]"
        />
      </div>

      {/* Submit Button */}
      <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={handleSubmit}>
        <Send className="h-4 w-4 mr-2" />
        평가 제출
      </Button>
    </div>
  )
}

function ReviewCard({
  review,
  userRole,
  showEdit = false,
}: {
  review: ReviewData
  userRole: "worker" | "employer"
  showEdit?: boolean
}) {
  const [isHelpful, setIsHelpful] = useState(false)

  const workerCategories = {
    punctuality: "시간준수",
    communication: "소통능력",
    workQuality: "업무품질",
    attitude: "태도",
    reliability: "신뢰성",
  }

  const employerCategories = {
    clarity: "업무설명",
    payment: "정산신속성",
    workplace: "근무환경",
    communication: "소통능력",
    fairness: "공정성",
  }

  const categoryLabels = review.revieweeRole === "worker" ? workerCategories : employerCategories

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src="/placeholder.svg?height=40&width=40" />
              <AvatarFallback>{review.reviewerName[0]}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium text-sm">{review.reviewerName}</div>
              <div className="text-xs text-gray-500">
                {review.jobTitle} · {review.date}
              </div>
              <Badge variant="outline" className="text-xs mt-1">
                {review.reviewerRole === "worker" ? "구직자" : "구인자"}
              </Badge>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{review.overallRating}.0</span>
            </div>
            {showEdit && (
              <Button variant="ghost" size="sm" className="text-xs p-0 h-auto mt-1">
                수정
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {/* Category Ratings */}
        <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
          {Object.entries(review.categories).map(([key, value]) => (
            <div key={key} className="flex justify-between">
              <span className="text-gray-600">{categoryLabels[key as keyof typeof categoryLabels]}</span>
              <span className="font-medium">{value}.0</span>
            </div>
          ))}
        </div>

        <Separator className="my-3" />

        {/* Comment */}
        <p className="text-sm text-gray-700 mb-3">{review.comment}</p>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsHelpful(!isHelpful)}
              className={`flex items-center gap-1 text-xs ${isHelpful ? "text-blue-600" : "text-gray-500"}`}
            >
              <ThumbsUp className="h-3 w-3" />
              <span>도움됨 {review.helpful}</span>
            </button>
          </div>
          <Button variant="ghost" size="sm" className="text-xs p-0 h-auto text-gray-500">
            <Flag className="h-3 w-3 mr-1" />
            신고
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
