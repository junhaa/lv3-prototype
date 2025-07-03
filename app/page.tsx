"use client"

import { useState, useEffect } from "react"
import { MapPin, Search, Filter, Bell, User, Plus, Star, Clock, MessageSquare, TrendingUp, Phone, Heart, List } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MyActivityScreen } from "@/components/my-activity-screen"
import { RoleBasedReviewSystem } from "@/components/role-based-review-system"
import { TrustScoreDashboard } from "@/components/trust-score-dashboard"
import { ProfileScreen } from "@/components/profile-screen"
import { JobDetailModal } from "@/components/job-detail-modal"
import { DistanceBasedFilter } from "@/components/distance-based-filter"
import { RealMapView } from "@/components/real-map-view"
import { SearchResults } from "@/components/search-results"
import { ImprovedNotificationCenter } from "@/components/improved-notification-center"
import { PostJobForm } from "@/components/post-job-form"
import { AIRecommendation } from "@/components/ai-recommendation"
import { ImprovedAuthModal } from "@/components/improved-auth-modal"
import { ChatSystem } from "@/components/chat-system"
import { ContactSystem } from "@/components/contact-system"
import { FavoritesScreen } from "@/components/favorites-screen"

export default function HomePage() {
  const [bottomNavTab, setBottomNavTab] = useState("find")
  const [selectedJob, setSelectedJob] = useState<any>(null)
  const [showJobDetail, setShowJobDetail] = useState(false)
  const [showPostJobForm, setShowPostJobForm] = useState(false)
  const [showFilter, setShowFilter] = useState(false)
  const [showMapView, setShowMapView] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showAuth, setShowAuth] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [showContact, setShowContact] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [appliedFilters, setAppliedFilters] = useState<any>({})
  const [favoriteJobs, setFavoriteJobs] = useState<number[]>([])
  const [showFavorites, setShowFavorites] = useState(false)
  const [mapLoaded, setMapLoaded] = useState(false)

  const nearbyJobs = [
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
      id: 2,
      title: "전단지 배포 도우미",
      company: "치킨마루 잠실점",
      location: "도보 5분",
      duration: "3시간",
      totalPay: 36000,
      workTime: "내일 09:00 ~ 12:00",
      rating: 4.5,
      reviews: 15,
      urgent: false,
      distance: "0.3km",
      description: "잠실 일대 전단지 배포 업무입니다.",
      requirements: ["체력 좋은 분", "친절한 분"],
      employer: {
        name: "김사장",
        rating: 4.5,
        reviews: 15,
        verified: true,
        phone: "010-9876-5432",
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
  ]

  // OpenStreetMap 초기화
  useEffect(() => {
    const loadMap = async () => {
      try {
        // Leaflet CSS 로드
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
        document.head.appendChild(link)

        // Leaflet JS 로드
        const script = document.createElement('script')
        script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
        script.onload = () => {
          setMapLoaded(true)
          initializeMap()
        }
        document.head.appendChild(script)
      } catch (error) {
        console.error('Map loading failed:', error)
      }
    }

    loadMap()
  }, [])

  const initializeMap = () => {
    if (typeof window !== 'undefined' && window.L && document.getElementById('mini-map')) {
      try {
        const map = window.L.map('mini-map', {
          center: [37.5665, 127.0997], // 잠실역 좌표
          zoom: 15,
          zoomControl: false,
          dragging: false,
          touchZoom: false,
          doubleClickZoom: false,
          scrollWheelZoom: false,
          boxZoom: false,
          keyboard: false,
        })

        window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(map)

        // 일자리 마커 추가
        nearbyJobs.forEach((job, index) => {
          const lat = 37.5665 + (Math.random() - 0.5) * 0.01
          const lng = 127.0997 + (Math.random() - 0.5) * 0.01
          
          const marker = window.L.marker([lat, lng]).addTo(map)
          marker.bindPopup(`
            <div style="font-size: 12px;">
              <strong>${job.title}</strong><br>
              ${job.company}<br>
              <span style="color: #059669; font-weight: bold;">${job.totalPay.toLocaleString()}원</span>
            </div>
          `)
        })
      } catch (error) {
        console.error('Map initialization failed:', error)
      }
    }
  }

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

  const handleFilterApply = (filters: any) => {
    setAppliedFilters(filters)
  }

  const handleLogin = (userData: any) => {
    setUser(userData)
  }

  const handleChatOpen = () => {
    setShowChat(true)
  }

  const handleContactOpen = () => {
    setShowContact(true)
  }

  const handleNavigateToActivity = () => {
    setBottomNavTab("activity")
  }

  const handleToggleFavorite = (jobId: number) => {
    setFavoriteJobs((prev) => (prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]))
  }

  // 구인 공고 작성 폼이 표시될 때
  if (showPostJobForm) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="flex-1">
          <PostJobForm onBack={() => setShowPostJobForm(false)} />
        </div>
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
                setShowFavorites(false)
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
                setShowFavorites(false)
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
                setShowFavorites(false)
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
                setShowFavorites(false)
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
                setShowFavorites(false)
              }}
            >
              <User className="h-5 w-5 mb-1" />
              <span className="text-xs">내 정보</span>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // 실시간 지도 화면
  if (showMapView) {
    return <RealMapView onBack={() => setShowMapView(false)} jobs={nearbyJobs} onJobSelect={handleJobClick} />
  }

  // 채팅 화면
  if (showChat) {
    return (
      <ChatSystem
        onBack={() => setShowChat(false)}
        contact={{
          id: "1",
          name: selectedJob?.employer?.name || "박서연",
          jobTitle: selectedJob?.title || "설거지 및 홀 정리",
          isOnline: true,
        }}
      />
    )
  }

  // 관심 목록 화면
  if (showFavorites) {
    return (
      <FavoritesScreen 
        onJobSelect={handleJobClick} 
        onContactOpen={handleContactOpen}
        onBack={() => setShowFavorites(false)}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">번</span>
          </div>
          <span className="font-bold text-lg">번개알바</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => setShowFavorites(true)}>
            <div className="relative">
              <Heart className="h-5 w-5" />
              {favoriteJobs.length > 0 && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">{favoriteJobs.length}</span>
                </div>
              )}
            </div>
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setShowNotifications(true)}>
            <div className="relative">
              <Bell className="h-5 w-5" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
            </div>
          </Button>
          <Button variant="ghost" size="icon" onClick={() => (user ? null : setShowAuth(true))}>
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Location Bar */}
      <div className="bg-white px-4 py-3 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4" />
            <span>잠실역 근처</span>
            <Button variant="ghost" size="sm" className="text-blue-600 p-0 h-auto">
              변경
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 pb-16">
        {bottomNavTab === "find" && !showSearchResults && (
          <div className="flex-1">
            {/* Map Section */}
            <div className="bg-white border-b">
              <div className="h-48 relative overflow-hidden">
                <div id="mini-map" className="w-full h-full"></div>
                {!mapLoaded && (
                  <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                      <p className="text-sm text-gray-500">지도 로딩 중...</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* AI Recommendation Section */}
            {user && (
              <div className="p-4 border-b">
                <AIRecommendation />
              </div>
            )}

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

            {/* Job List */}
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-lg">근처 일자리</h2>
                <Button variant="ghost" size="sm" className="text-blue-600">
                  <List className="h-4 w-4 mr-1" />
                  전체보기
                </Button>
              </div>

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
                      <div className="flex items-center gap-2">
                        <div className="text-right">
                          <div className="font-bold text-green-600 text-lg">{job.totalPay.toLocaleString()}원</div>
                          <div className="text-xs text-gray-500">건당</div>
                          <div className="text-xs text-gray-400">{job.duration}</div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className={favoriteJobs.includes(job.id) ? "text-red-500" : "text-gray-400"}
                          onClick={(e) => {
                            e.stopPropagation()
                            handleToggleFavorite(job.id)
                          }}
                        >
                          <Heart className={`h-4 w-4 ${favoriteJobs.includes(job.id) ? "fill-current" : ""}`} />
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
                            setSelectedJob(job)
                            handleContactOpen()
                          }}
                        >
                          <Phone className="h-3 w-3" />
                        </Button>
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
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Post Job Section */}
            <div className="p-4 border-t bg-gray-50">
              <h2 className="font-semibold text-lg mb-4">구인하기</h2>

              {/* Emergency Post */}
              <Card className="border-red-200 bg-red-50 cursor-pointer mb-4" onClick={handlePostJob}>
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

              {/* Main Post Button */}
              <Button className="w-full h-16 bg-blue-600 hover:bg-blue-700 text-lg" onClick={handlePostJob}>
                <Plus className="h-6 w-6 mr-2" />
                구인 공고 작성하기
              </Button>
              
              <p className="text-xs text-gray-500 text-center mt-2">
                간편하게 구인 공고를 작성하고 적합한 인재를 찾아보세요
              </p>
            </div>
          </div>
        )}

        {showSearchResults && <SearchResults query={searchQuery} onBack={() => setShowSearchResults(false)} />}
        {bottomNavTab === "activity" && <MyActivityScreen />}
        {bottomNavTab === "review" && <RoleBasedReviewSystem />}
        {bottomNavTab === "trust" && <TrustScoreDashboard />}
        {bottomNavTab === "profile" && <ProfileScreen onNavigateToActivity={handleNavigateToActivity} />}
      </div>

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
              setShowFavorites(false)
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
              setShowFavorites(false)
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
              setShowFavorites(false)
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
              setShowFavorites(false)
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
              setShowFavorites(false)
            }}
          >
            <User className="h-5 w-5 mb-1" />
            <span className="text-xs">내 정보</span>
          </Button>
        </div>
      </div>

      {/* Modals */}
      <JobDetailModal
        isOpen={showJobDetail}
        onClose={() => setShowJobDetail(false)}
        job={selectedJob}
        onChatOpen={handleChatOpen}
        onContactOpen={handleContactOpen}
      />

      <DistanceBasedFilter isOpen={showFilter} onClose={() => setShowFilter(false)} onApply={handleFilterApply} />

      <ImprovedNotificationCenter isOpen={showNotifications} onClose={() => setShowNotifications(false)} />

      <ImprovedAuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} onLogin={handleLogin} />

      <ContactSystem
        isOpen={showContact}
        onClose={() => setShowContact(false)}
        contact={{
          id: selectedJob?.id || "1",
          name: selectedJob?.employer?.name || "박서연",
          jobTitle: selectedJob?.title || "설거지 및 홀 정리",
          phone: selectedJob?.employer?.phone,
          email: selectedJob?.employer?.email,
          isOnline: true,
          rating: selectedJob?.employer?.rating || 4.8,
          reviews: selectedJob?.employer?.reviews || 23,
        }}
        onChatOpen={handleChatOpen}
      />
    </div>
  )
}
