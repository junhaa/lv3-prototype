"use client"

import { useState } from "react"
import { MapPin, Search, Filter, Bell, User, Plus, Star, Clock, MessageSquare, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MyActivityScreen } from "@/components/my-activity-screen"
import { ReviewSystem } from "@/components/review-system"
import { TrustScoreDashboard } from "@/components/trust-score-dashboard"
import { ProfileScreen } from "@/components/profile-screen"
import { JobDetailModal } from "@/components/job-detail-modal"
import { FilterModal } from "@/components/filter-modal"
import { MapViewModal } from "@/components/map-view-modal"
import { SearchResults } from "@/components/search-results"
import { NotificationCenter } from "@/components/notification-center"
import { PostJobForm } from "@/components/post-job-form"

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("find")
  const [bottomNavTab, setBottomNavTab] = useState("find")
  const [selectedJob, setSelectedJob] = useState<any>(null)
  const [showJobDetail, setShowJobDetail] = useState(false)
  const [showPostJobForm, setShowPostJobForm] = useState(false)
  const [showFilter, setShowFilter] = useState(false)
  const [showMap, setShowMap] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearchResults, setShowSearchResults] = useState(false)

  const nearbyJobs = [
    {
      id: 1,
      title: "긴급) 설거지 및 홀 정리",
      company: "서연카페",
      location: "도보 10분",
      duration: "2시간",
      pay: "25,000원",
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
      },
    },
    {
      id: 2,
      title: "전단지 배포 도우미",
      company: "치킨마루 홍대점",
      location: "도보 5분",
      duration: "3시간",
      pay: "36,000원",
      rating: 4.5,
      reviews: 15,
      urgent: false,
      distance: "0.3km",
      description: "홍대 일대 전단지 배포 업무입니다.",
      requirements: ["체력 좋은 분", "친절한 분"],
      employer: {
        name: "김사장",
        rating: 4.5,
        reviews: 15,
        verified: true,
      },
    },
    {
      id: 3,
      title: "이케아 책장 조립 도움",
      company: "박현우님",
      location: "도보 15분",
      duration: "1-2시간",
      pay: "40,000원",
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
      },
    },
  ]

  const handleJobClick = (job: any) => {
    setSelectedJob(job)
    setShowJobDetail(true)
  }

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setShowSearchResults(true)
    }
  }

  const handlePostJob = () => {
    setShowPostJobForm(true)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* 구인 공고 작성 폼이 표시될 때 */}
      {showPostJobForm ? (
        <>
          <div className="flex-1">
            <PostJobForm onBack={() => setShowPostJobForm(false)} />
          </div>
        </>
      ) : (
        <>
          {/* Header */}
          <div className="bg-white border-b px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">번</span>
              </div>
              <span className="font-bold text-lg">번개알바</span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={() => setShowNotifications(true)}>
                <Bell className="h-5 w-5" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
              </Button>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Location Bar */}
          <div className="bg-white px-4 py-3 border-b">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="h-4 w-4" />
              <span>홍익대학교 근처</span>
              <Button variant="ghost" size="sm" className="text-blue-600 p-0 h-auto">
                변경
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 pb-16">
            {bottomNavTab === "find" && !showSearchResults && (
              <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
                <TabsList className="grid w-full grid-cols-2 bg-white border-b rounded-none h-12">
                  <TabsTrigger
                    value="find"
                    className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600"
                  >
                    일자리 찾기
                  </TabsTrigger>
                  <TabsTrigger
                    value="post"
                    className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600"
                  >
                    구인하기
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="find" className="mt-0">
                  {/* Search and Filter */}
                  <div className="bg-white p-4 border-b">
                    <div className="flex gap-2">
                      <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="업무, 업체명으로 검색"
                          className="pl-10"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                        />
                      </div>
                      <Button variant="outline" size="icon" onClick={() => setShowFilter(true)}>
                        <Filter className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex gap-2 mt-3">
                      <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                        전체
                      </Badge>
                      <Badge variant="outline">카페/음식점</Badge>
                      <Badge variant="outline">배달/배송</Badge>
                      <Badge variant="outline">생활도움</Badge>
                    </div>
                  </div>

                  {/* Map View Toggle */}
                  <div className="bg-white px-4 py-2 border-b">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full bg-transparent"
                      onClick={() => setShowMap(true)}
                    >
                      <MapPin className="h-4 w-4 mr-2" />
                      지도에서 보기
                    </Button>
                  </div>

                  {/* Job List */}
                  <div className="p-4 space-y-3">
                    {nearbyJobs.map((job) => (
                      <Card
                        key={job.id}
                        className="cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => handleJobClick(job)}
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
                            <div className="text-right">
                              <div className="font-bold text-blue-600">{job.pay}</div>
                              <div className="text-xs text-gray-500">{job.duration}</div>
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
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                <span>{job.rating}</span>
                                <span>({job.reviews})</span>
                              </div>
                            </div>
                            <Button
                              size="sm"
                              className="bg-blue-600 hover:bg-blue-700"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleJobClick(job)
                              }}
                            >
                              지원하기
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="post" className="mt-0">
                  <div className="p-4">
                    {/* Quick Post Templates */}
                    <div className="mb-6">
                      <h3 className="font-semibold mb-3">빠른 구인</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={handlePostJob}>
                          <CardContent className="p-4 text-center">
                            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                              <span className="text-orange-600 text-xl">🍽️</span>
                            </div>
                            <div className="font-medium">카페/음식점</div>
                            <div className="text-xs text-gray-500">홀서빙, 설거지 등</div>
                          </CardContent>
                        </Card>

                        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={handlePostJob}>
                          <CardContent className="p-4 text-center">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                              <span className="text-green-600 text-xl">🏠</span>
                            </div>
                            <div className="font-medium">생활도움</div>
                            <div className="text-xs text-gray-500">조립, 청소, 설치</div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>

                    {/* Emergency Post */}
                    <Card className="border-red-200 bg-red-50 cursor-pointer" onClick={handlePostJob}>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold">긴급</span>
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-red-700">긴급 구인하기</div>
                            <div className="text-sm text-red-600">지금 당장 필요한 인력을 구해보세요</div>
                          </div>
                          <Button className="bg-red-500 hover:bg-red-600">등록</Button>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Saved Templates */}
                    <div className="mt-6">
                      <h3 className="font-semibold mb-3">저장된 템플릿</h3>
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">설거지 및 홀 정리</div>
                              <div className="text-sm text-gray-500">서연카페 · 2시간 · 25,000원</div>
                            </div>
                            <Button variant="outline" size="sm" onClick={handlePostJob}>
                              재사용
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Custom Post Button */}
                    <Button className="w-full mt-6 h-12 bg-blue-600 hover:bg-blue-700" onClick={handlePostJob}>
                      <Plus className="h-5 w-5 mr-2" />새 구인 공고 작성
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            )}

            {showSearchResults && <SearchResults query={searchQuery} onBack={() => setShowSearchResults(false)} />}
            {bottomNavTab === "activity" && <MyActivityScreen />}
            {bottomNavTab === "review" && <ReviewSystem />}
            {bottomNavTab === "trust" && <TrustScoreDashboard />}
            {bottomNavTab === "profile" && <ProfileScreen />}
          </div>
        </>
      )}

      {/* Bottom Navigation - 항상 표시 */}
      <div className="bg-white border-t px-4 py-2 fixed bottom-0 left-0 right-0 max-w-md mx-auto">
        <div className="flex justify-around">
          <Button
            variant="ghost"
            className={`flex-col h-auto py-2 ${bottomNavTab === "find" ? "text-blue-600" : ""}`}
            onClick={() => {
              setBottomNavTab("find")
              setShowSearchResults(false)
              setShowPostJobForm(false)
            }}
          >
            <Search className="h-5 w-5 mb-1" />
            <span className="text-xs">찾기</span>
          </Button>
          <Button
            variant="ghost"
            className={`flex-col h-auto py-2 ${bottomNavTab === "activity" ? "text-blue-600" : ""}`}
            onClick={() => {
              setBottomNavTab("activity")
              setShowPostJobForm(false)
            }}
          >
            <Clock className="h-5 w-5 mb-1" />
            <span className="text-xs">내 활동</span>
          </Button>
          <Button
            variant="ghost"
            className={`flex-col h-auto py-2 ${bottomNavTab === "review" ? "text-blue-600" : ""}`}
            onClick={() => {
              setBottomNavTab("review")
              setShowPostJobForm(false)
            }}
          >
            <MessageSquare className="h-5 w-5 mb-1" />
            <span className="text-xs">평가</span>
          </Button>
          <Button
            variant="ghost"
            className={`flex-col h-auto py-2 ${bottomNavTab === "trust" ? "text-blue-600" : ""}`}
            onClick={() => {
              setBottomNavTab("trust")
              setShowPostJobForm(false)
            }}
          >
            <TrendingUp className="h-5 w-5 mb-1" />
            <span className="text-xs">신뢰도</span>
          </Button>
          <Button
            variant="ghost"
            className={`flex-col h-auto py-2 ${bottomNavTab === "profile" ? "text-blue-600" : ""}`}
            onClick={() => {
              setBottomNavTab("profile")
              setShowPostJobForm(false)
            }}
          >
            <User className="h-5 w-5 mb-1" />
            <span className="text-xs">내 정보</span>
          </Button>
        </div>
      </div>

      {/* Modals */}
      <JobDetailModal isOpen={showJobDetail} onClose={() => setShowJobDetail(false)} job={selectedJob} />

      <FilterModal isOpen={showFilter} onClose={() => setShowFilter(false)} />

      <MapViewModal isOpen={showMap} onClose={() => setShowMap(false)} jobs={nearbyJobs} onJobSelect={handleJobClick} />

      <NotificationCenter isOpen={showNotifications} onClose={() => setShowNotifications(false)} />
    </div>
  )
}
