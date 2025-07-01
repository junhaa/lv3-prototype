"use client"

import { useState } from "react"
import { Star, ThumbsUp, Flag, Camera, Send, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface ReviewData {
  id: string
  jobTitle: string
  reviewerName: string
  reviewerType: "employer" | "worker"
  revieweeType: "employer" | "worker"
  date: string
  overallRating: number
  categories: {
    punctuality: number
    communication: number
    workQuality: number
    attitude: number
  }
  comment: string
  photos?: string[]
  helpful: number
  reported: boolean
}

export function ReviewSystem() {
  const [activeTab, setActiveTab] = useState("write")
  const [currentReview, setCurrentReview] = useState<Partial<ReviewData>>({
    overallRating: 5,
    categories: {
      punctuality: 5,
      communication: 5,
      workQuality: 5,
      attitude: 5,
    },
    comment: "",
  })

  const pendingReviews = [
    {
      id: "1",
      jobTitle: "카페 홀서빙",
      employer: "서연카페",
      worker: "김민준",
      date: "2024.01.15",
      status: "pending",
    },
    {
      id: "2",
      jobTitle: "이케아 책장 조립",
      employer: "박현우님",
      worker: "김영철",
      date: "2024.01.14",
      status: "completed",
    },
  ]

  const recentReviews: ReviewData[] = [
    {
      id: "1",
      jobTitle: "카페 홀서빙",
      reviewerName: "서연카페",
      reviewerType: "employer",
      revieweeType: "worker",
      date: "2024.01.15",
      overallRating: 5,
      categories: {
        punctuality: 5,
        communication: 4,
        workQuality: 5,
        attitude: 5,
      },
      comment: "시간 약속을 잘 지키시고 성실하게 일해주셨어요. 손님들에게도 친절하게 응대해주셔서 만족스러웠습니다.",
      helpful: 12,
      reported: false,
    },
    {
      id: "2",
      jobTitle: "전단지 배포",
      reviewerName: "김민준",
      reviewerType: "worker",
      revieweeType: "employer",
      date: "2024.01.12",
      overallRating: 4,
      categories: {
        punctuality: 5,
        communication: 4,
        workQuality: 4,
        attitude: 4,
      },
      comment: "업무 설명을 자세히 해주셨고 약속한 시간에 정산해주셨어요. 다만 업무량이 예상보다 많았습니다.",
      helpful: 8,
      reported: false,
    },
  ]

  const handleRatingChange = (category: string, value: number[]) => {
    if (category === "overall") {
      setCurrentReview((prev) => ({ ...prev, overallRating: value[0] }))
    } else {
      setCurrentReview((prev) => ({
        ...prev,
        categories: {
          ...prev.categories!,
          [category]: value[0],
        },
      }))
    }
  }

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
            {/* Pending Reviews */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">평가 대기 중</CardTitle>
                <CardDescription>완료된 업무에 대한 평가를 작성해주세요</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {pendingReviews.map((job) => (
                  <div key={job.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-sm">{job.jobTitle}</div>
                      <div className="text-xs text-gray-500">
                        {job.employer} · {job.date}
                      </div>
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
                        <ReviewWriteForm job={job} />
                      </DialogContent>
                    </Dialog>
                  </div>
                ))}
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
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>시간 준수</span>
                      <span className="font-medium">4.9</span>
                    </div>
                    <Progress value={98} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>소통 능력</span>
                      <span className="font-medium">4.7</span>
                    </div>
                    <Progress value={94} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>업무 품질</span>
                      <span className="font-medium">4.8</span>
                    </div>
                    <Progress value={96} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>태도</span>
                      <span className="font-medium">4.9</span>
                    </div>
                    <Progress value={98} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Reviews */}
            <div className="space-y-3">
              {recentReviews
                .filter((review) => review.revieweeType === "worker")
                .map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="given" className="mt-0">
          <div className="p-4 space-y-3">
            {recentReviews
              .filter((review) => review.reviewerType === "worker")
              .map((review) => (
                <ReviewCard key={review.id} review={review} showEdit />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ReviewWriteForm({ job }: { job: any }) {
  const [rating, setRating] = useState(5)
  const [categories, setCategories] = useState({
    punctuality: 5,
    communication: 5,
    workQuality: 5,
    attitude: 5,
  })
  const [comment, setComment] = useState("")
  const [photos, setPhotos] = useState<string[]>([])

  const categoryLabels = {
    punctuality: "시간 준수",
    communication: "소통 능력",
    workQuality: "업무 품질",
    attitude: "태도",
  }

  return (
    <div className="space-y-6">
      {/* Job Info */}
      <div className="p-3 bg-gray-50 rounded-lg">
        <div className="font-medium">{job.jobTitle}</div>
        <div className="text-sm text-gray-600">
          {job.employer} · {job.date}
        </div>
      </div>

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
        {Object.entries(categories).map(([key, value]) => (
          <div key={key}>
            <div className="flex justify-between text-sm mb-2">
              <span>{categoryLabels[key as keyof typeof categoryLabels]}</span>
              <span className="font-medium">{value}.0</span>
            </div>
            <Slider
              value={[value]}
              onValueChange={(newValue) => setCategories((prev) => ({ ...prev, [key]: newValue[0] }))}
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

      {/* Photo Upload */}
      <div>
        <label className="block text-sm font-medium mb-2">사진 첨부 (선택)</label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
          <Camera className="h-6 w-6 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-500">업무 관련 사진을 첨부해주세요</p>
          <Button variant="outline" size="sm" className="mt-2 bg-transparent">
            사진 선택
          </Button>
        </div>
      </div>

      {/* Submit Button */}
      <Button className="w-full bg-blue-600 hover:bg-blue-700">
        <Send className="h-4 w-4 mr-2" />
        평가 제출
      </Button>
    </div>
  )
}

function ReviewCard({ review, showEdit = false }: { review: ReviewData; showEdit?: boolean }) {
  const [isHelpful, setIsHelpful] = useState(false)

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
          <div className="flex justify-between">
            <span className="text-gray-600">시간준수</span>
            <span className="font-medium">{review.categories.punctuality}.0</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">소통능력</span>
            <span className="font-medium">{review.categories.communication}.0</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">업무품질</span>
            <span className="font-medium">{review.categories.workQuality}.0</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">태도</span>
            <span className="font-medium">{review.categories.attitude}.0</span>
          </div>
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
