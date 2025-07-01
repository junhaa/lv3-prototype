"use client"

import { useState } from "react"
import {
  Clock,
  MapPin,
  Star,
  Eye,
  Edit,
  Trash2,
  Calendar,
  CheckCircle,
  AlertCircle,
  XCircle,
  Users,
  MessageCircle,
  Navigation,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { toast } from "@/hooks/use-toast"
import { CheckInModal } from "@/components/check-in-modal"
import { ScheduleManager } from "@/components/schedule-manager"
import { EditPostingModal } from "@/components/edit-posting-modal"

interface JobActivity {
  id: string
  title: string
  company: string
  type: "applied" | "matched" | "ongoing" | "completed" | "cancelled"
  date: string
  startTime?: string
  endTime?: string
  duration: string
  pay: string
  location: string
  rating?: number
  review?: string
  applicants?: number
  employer?: {
    name: string
    phone: string
  }
}

interface MyPosting {
  id: string
  title: string
  category: string
  status: "active" | "filled" | "expired"
  applicants: number
  views: number
  date: string
  pay: string
  duration: string
  description: string
}

export function MyActivityScreen() {
  const [activeTab, setActiveTab] = useState("current")
  const [showCheckIn, setShowCheckIn] = useState(false)
  const [showSchedule, setShowSchedule] = useState(false)
  const [selectedJob, setSelectedJob] = useState<JobActivity | null>(null)
  const [selectedPosting, setSelectedPosting] = useState<MyPosting | null>(null)
  const [showEditPosting, setShowEditPosting] = useState(false)

  const currentJobs: JobActivity[] = [
    {
      id: "1",
      title: "카페 홀서빙",
      company: "스타벅스 홍대점",
      type: "matched",
      date: "오늘",
      startTime: "14:00",
      endTime: "18:00",
      duration: "4시간",
      pay: "48,000원",
      location: "홍익대학교 근처",
      employer: {
        name: "김사장",
        phone: "010-1234-5678",
      },
    },
    {
      id: "2",
      title: "전단지 배포",
      company: "치킨마루",
      type: "applied",
      date: "내일",
      duration: "3시간",
      pay: "36,000원",
      location: "신촌역 근처",
      applicants: 5,
    },
  ]

  const completedJobs: JobActivity[] = [
    {
      id: "3",
      title: "설거지 및 홀 정리",
      company: "서연카페",
      type: "completed",
      date: "2024.01.15",
      duration: "2시간",
      pay: "25,000원",
      location: "홍익대학교 근처",
      rating: 5,
      review: "성실하고 친절하게 일해주셨어요!",
    },
    {
      id: "4",
      title: "이벤트 도우미",
      company: "마케팅회사",
      type: "completed",
      date: "2024.01.12",
      duration: "6시간",
      pay: "90,000원",
      location: "강남역 근처",
      rating: 4,
      review: "시간 약속을 잘 지키시네요.",
    },
  ]

  const myPostings: MyPosting[] = [
    {
      id: "1",
      title: "이케아 책장 조립 도움",
      category: "생활도움",
      status: "filled",
      applicants: 3,
      views: 24,
      date: "2024.01.14",
      pay: "40,000원",
      duration: "2시간",
      description: "이케아 책장 조립을 도와주실 분을 찾습니다.",
    },
    {
      id: "2",
      title: "청소 도우미",
      category: "생활도움",
      status: "active",
      applicants: 1,
      views: 12,
      date: "2024.01.16",
      pay: "30,000원",
      duration: "3시간",
      description: "집 청소를 도와주실 분을 찾습니다.",
    },
  ]

  const monthlyStats = {
    totalJobs: 8,
    totalEarnings: 320000,
    averageRating: 4.8,
    completionRate: 100,
  }

  const handleCheckIn = (job: JobActivity) => {
    setSelectedJob(job)
    setShowCheckIn(true)
  }

  const handleContact = (job: JobActivity) => {
    toast({
      title: "연락하기",
      description: `${job.employer?.name}님과 채팅을 시작합니다.`,
    })
  }

  const handleCancelApplication = (jobId: string) => {
    toast({
      title: "지원 취소",
      description: "지원이 취소되었습니다.",
    })
  }

  const handleEditPosting = (posting: MyPosting) => {
    setSelectedPosting(posting)
    setShowEditPosting(true)
  }

  const handleDeletePosting = (postingId: string) => {
    toast({
      title: "공고 삭제",
      description: "구인 공고가 삭제되었습니다.",
    })
  }

  const handleNavigation = (location: string) => {
    toast({
      title: "길찾기",
      description: `${location}로 길찾기를 시작합니다.`,
    })
  }

  return (
    <div className="flex-1 bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-4 py-3">
        <h1 className="font-bold text-lg">내 활동</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
        <TabsList className="grid w-full grid-cols-4 bg-white border-b rounded-none h-12">
          <TabsTrigger value="current" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600">
            진행중
          </TabsTrigger>
          <TabsTrigger value="completed" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600">
            완료
          </TabsTrigger>
          <TabsTrigger value="posted" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600">
            내 공고
          </TabsTrigger>
          <TabsTrigger value="stats" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600">
            통계
          </TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="mt-0">
          <div className="p-4 space-y-4">
            {/* Quick Actions */}
            <Card>
              <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="h-12 bg-transparent" onClick={() => setShowSchedule(true)}>
                    <Calendar className="h-4 w-4 mr-2" />
                    일정 관리
                  </Button>
                  <Button variant="outline" className="h-12 bg-transparent">
                    <MapPin className="h-4 w-4 mr-2" />
                    근처 일자리
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Current Jobs */}
            <div className="space-y-3">
              {currentJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  showActions
                  onCheckIn={() => handleCheckIn(job)}
                  onContact={() => handleContact(job)}
                  onCancel={() => handleCancelApplication(job.id)}
                  onNavigation={() => handleNavigation(job.location)}
                />
              ))}
            </div>

            {currentJobs.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center">
                  <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <div className="text-gray-500 mb-2">진행 중인 일자리가 없습니다</div>
                  <Button className="bg-blue-600 hover:bg-blue-700">새 일자리 찾기</Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="mt-0">
          <div className="p-4 space-y-3">
            {completedJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="posted" className="mt-0">
          <div className="p-4 space-y-4">
            {/* Posting Stats */}
            <Card>
              <CardContent className="p-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">2</div>
                    <div className="text-xs text-gray-600">활성 공고</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">4</div>
                    <div className="text-xs text-gray-600">총 지원자</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">36</div>
                    <div className="text-xs text-gray-600">총 조회수</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* My Postings */}
            <div className="space-y-3">
              {myPostings.map((posting) => (
                <PostingCard
                  key={posting.id}
                  posting={posting}
                  onEdit={() => handleEditPosting(posting)}
                  onDelete={() => handleDeletePosting(posting.id)}
                />
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="stats" className="mt-0">
          <div className="p-4 space-y-4">
            {/* Monthly Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">이번 달 활동</CardTitle>
                <CardDescription>2024년 1월</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{monthlyStats.totalJobs}</div>
                    <div className="text-sm text-blue-700">완료한 일</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {(monthlyStats.totalEarnings / 10000).toFixed(0)}만원
                    </div>
                    <div className="text-sm text-green-700">총 수입</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>평균 평점</span>
                      <span className="font-medium">{monthlyStats.averageRating}</span>
                    </div>
                    <Progress value={(monthlyStats.averageRating / 5) * 100} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>완료율</span>
                      <span className="font-medium">{monthlyStats.completionRate}%</span>
                    </div>
                    <Progress value={monthlyStats.completionRate} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Weekly Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">주간 활동</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-32 bg-gray-100 rounded-lg flex items-end justify-around p-4">
                  {["월", "화", "수", "목", "금", "토", "일"].map((day, index) => {
                    const height = Math.random() * 60 + 20
                    return (
                      <div key={day} className="flex flex-col items-center">
                        <div className="bg-blue-500 rounded-t w-6 mb-2" style={{ height: `${height}px` }} />
                        <span className="text-xs text-gray-600">{day}</span>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Category Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">카테고리별 활동</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { category: "카페/음식점", count: 5, percentage: 62 },
                  { category: "배달/배송", count: 2, percentage: 25 },
                  { category: "생활도움", count: 1, percentage: 13 },
                ].map((item) => (
                  <div key={item.category}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{item.category}</span>
                      <span className="font-medium">{item.count}회</span>
                    </div>
                    <Progress value={item.percentage} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <CheckInModal isOpen={showCheckIn} onClose={() => setShowCheckIn(false)} job={selectedJob} />

      <ScheduleManager isOpen={showSchedule} onClose={() => setShowSchedule(false)} />

      <EditPostingModal isOpen={showEditPosting} onClose={() => setShowEditPosting(false)} posting={selectedPosting} />
    </div>
  )
}

function JobCard({
  job,
  showActions = false,
  onCheckIn,
  onContact,
  onCancel,
  onNavigation,
}: {
  job: JobActivity
  showActions?: boolean
  onCheckIn?: () => void
  onContact?: () => void
  onCancel?: () => void
  onNavigation?: () => void
}) {
  const getStatusColor = (type: string) => {
    switch (type) {
      case "applied":
        return "bg-yellow-100 text-yellow-800"
      case "matched":
        return "bg-blue-100 text-blue-800"
      case "ongoing":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (type: string) => {
    switch (type) {
      case "applied":
        return "지원함"
      case "matched":
        return "매칭됨"
      case "ongoing":
        return "진행중"
      case "completed":
        return "완료"
      case "cancelled":
        return "취소됨"
      default:
        return "알 수 없음"
    }
  }

  const getStatusIcon = (type: string) => {
    switch (type) {
      case "applied":
        return <Clock className="h-3 w-3" />
      case "matched":
        return <CheckCircle className="h-3 w-3" />
      case "ongoing":
        return <AlertCircle className="h-3 w-3" />
      case "completed":
        return <CheckCircle className="h-3 w-3" />
      case "cancelled":
        return <XCircle className="h-3 w-3" />
      default:
        return <Clock className="h-3 w-3" />
    }
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Badge className={getStatusColor(job.type)}>
                {getStatusIcon(job.type)}
                <span className="ml-1">{getStatusText(job.type)}</span>
              </Badge>
            </div>
            <CardTitle className="text-base">{job.title}</CardTitle>
            <CardDescription className="text-sm">{job.company}</CardDescription>
          </div>
          <div className="text-right">
            <div className="font-bold text-blue-600">{job.pay}</div>
            <div className="text-xs text-gray-500">{job.duration}</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2">
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{job.date}</span>
            </div>
          </div>

          {job.startTime && job.endTime && (
            <div className="text-sm text-gray-600">
              <Clock className="h-3 w-3 inline mr-1" />
              {job.startTime} - {job.endTime}
            </div>
          )}

          {job.rating && (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{job.rating}.0</span>
              </div>
              {job.review && <span className="text-sm text-gray-600">"{job.review}"</span>}
            </div>
          )}

          {job.applicants && (
            <div className="text-sm text-gray-600">
              <Users className="h-3 w-3 inline mr-1" />
              지원자 {job.applicants}명
            </div>
          )}

          {showActions && (
            <div className="flex gap-2 pt-2">
              {job.type === "matched" && (
                <>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={onCheckIn}>
                    출근 체크
                  </Button>
                  <Button size="sm" variant="outline" className="bg-transparent" onClick={onContact}>
                    <MessageCircle className="h-3 w-3 mr-1" />
                    연락
                  </Button>
                  <Button size="sm" variant="outline" className="bg-transparent" onClick={onNavigation}>
                    <Navigation className="h-3 w-3 mr-1" />
                    길찾기
                  </Button>
                </>
              )}
              {job.type === "applied" && (
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-transparent text-red-600 border-red-200"
                  onClick={onCancel}
                >
                  지원 취소
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function PostingCard({
  posting,
  onEdit,
  onDelete,
}: {
  posting: MyPosting
  onEdit: () => void
  onDelete: () => void
}) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "filled":
        return "bg-blue-100 text-blue-800"
      case "expired":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "모집중"
      case "filled":
        return "모집완료"
      case "expired":
        return "만료됨"
      default:
        return "알 수 없음"
    }
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Badge className={getStatusColor(posting.status)}>{getStatusText(posting.status)}</Badge>
              <Badge variant="outline" className="text-xs">
                {posting.category}
              </Badge>
            </div>
            <CardTitle className="text-base">{posting.title}</CardTitle>
            <CardDescription className="text-sm">{posting.date}</CardDescription>
          </div>
          <div className="text-right">
            <div className="font-bold text-blue-600">{posting.pay}</div>
            <div className="text-xs text-gray-500">{posting.duration}</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              <span>지원자 {posting.applicants}명</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              <span>조회 {posting.views}회</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="bg-transparent" onClick={onEdit}>
              <Edit className="h-3 w-3 mr-1" />
              수정
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="bg-transparent text-red-600 border-red-200"
              onClick={onDelete}
            >
              <Trash2 className="h-3 w-3 mr-1" />
              삭제
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
