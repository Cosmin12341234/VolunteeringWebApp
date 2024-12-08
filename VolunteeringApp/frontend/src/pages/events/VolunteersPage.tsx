'use client'

import { useState, useEffect } from "react"
import { format } from "date-fns"
import EventService from "@/apis/event/EventService"
import { UserService } from "@/apis/user/UserService"
import { EventResponse, User } from "@/utils/types"

export default function VolunteersPage() {
    const [currentUser, setCurrentUser] = useState<User | null>(null)
    const [evenimente, setEvenimente] = useState<EventResponse[]>([])
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [dateRange, setDateRange] = useState<{ startDate: string; endDate: string }>({
        startDate: '',
        endDate: '',
    })
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        loadUserInfo()
        loadEvents()
    }, [])

    useEffect(() => {
        if (currentUser?.username && currentUser?.password) {
            loadEvents()
        }
    }, [currentUser])

    const loadUserInfo = async () => {
        try {
            const user = await UserService.getCurrentUser()
            setCurrentUser(user)
        } catch (err) {
            setError("Eroare la încărcarea informațiilor utilizatorului. Vă rugăm să vă autentificați din nou.")
        }
    }

    const loadEvents = async () => {
        if (!currentUser) return

        setIsLoading(true)
        setError(null)
        try {
            const eventsData = await EventService.getEvents(currentUser.username, currentUser.password)
            setEvenimente(eventsData)
        } catch (err) {
            setError("Eroare la încărcarea evenimentelor")
        } finally {
            setIsLoading(false)
        }
    }

    const handleFindEventByName = async () => {
        if (!currentUser) return
        if (!searchTerm) {
            alert('Introduceți un nume')
            return
        }
        setIsLoading(true)
        setError(null)
        try {
            const eventsData = await EventService.getEventsByName(searchTerm, currentUser.username, currentUser.password)
            if (eventsData.length === 0) {
                setError("Nu s-au găsit evenimente pentru numele dat.")
                setEvenimente([])
            } else {
                setEvenimente(eventsData)
            }
        } catch (error) {
            setError("Eroare la încărcarea evenimentelor după nume")
        } finally {
            setIsLoading(false)
        }
    }

    const handleFindEventsByDateRange = async () => {
        if (!currentUser || !dateRange.startDate || !dateRange.endDate) return

        setIsLoading(true)
        setError(null)
        try {
            const eventsData = await EventService.getEventsByDateRange(
                currentUser.username,
                currentUser.password,
                dateRange.startDate,
                dateRange.endDate
            )
            if (eventsData.length === 0) {
                setError("Nu s-au găsit evenimente în intervalul de date specificat.")
                setEvenimente([])
            } else {
                setEvenimente(eventsData)
            }
        } catch (err) {
            setError("Eroare la căutarea evenimentelor după interval de date")
        } finally {
            setIsLoading(false)
        }
    }

    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const button = e.currentTarget;
        button.textContent = 'Inscris';
    };


    const goToProfile = () => {
    }

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-white shadow-md p-6 flex flex-col">
                <div className="text-2xl font-bold text-blue-600">VolunteerHub</div>
                <div className="mt-8 flex-grow">
                    <button onClick={goToProfile} className="w-full bg-brown text-white text-left py-2 px-4 rounded hover:bg-gray-100 transition-colors">
                        Profil
                    </button>
                    {/* Add more navigation items here */}
                </div>
                <div className="mt-auto">
                    <p className="text-sm text-gray-500">Conectat ca:</p>
                    <p className="font-medium">{currentUser?.username}</p>
                </div>
            </div>

            {/* Main content */}
            <div className="flex-1 overflow-auto">

                <main className="p-6">
                    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                        <h2 className="text-xl font-semibold mb-4">Căutare Evenimente</h2>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <input
                                    type="text"
                                    placeholder="Căutați după nume..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="flex-grow px-3 py-2 border rounded-md"
                                />
                                <button
                                    onClick={handleFindEventByName}
                                    className="px-4 py-2 bg-brown text-white rounded-md hover:bg-blue-600 transition-colors"
                                >
                                    Căutare
                                </button>
                            </div>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="date"
                                    value={dateRange.startDate}
                                    onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
                                    className="flex-grow px-3 py-2 border rounded-md"
                                />
                                <input
                                    type="date"
                                    value={dateRange.endDate}
                                    onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
                                    className="flex-grow px-3 py-2 border rounded-md"
                                />
                                <button
                                    onClick={handleFindEventsByDateRange}
                                    className="px-4 py-2 bg-brown text-white rounded-md hover:bg-blue-600 transition-colors"
                                >
                                    Caută după dată
                                </button>
                            </div>
                        </div>
                    </div>

                    {isLoading && <p className="text-center text-gray-600">Se încarcă evenimentele...</p>}
                    {error && <p className="text-center text-red-500">{error}</p>}
                    {!isLoading && !error && evenimente.length === 0 && (
                        <p className="text-center text-gray-600">Nu s-au găsit evenimente.</p>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {evenimente.map((event) => (
                            <div key={event.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold mb-2">{event.name}</h3>
                                    <p className="text-gray-600 mb-2">{event.location}</p>
                                    <p className="text-gray-700 mb-4">{event.description}</p>
                                    <div className="flex justify-between items-center">
                                        <p className="text-sm text-gray-600">
                                            {format(new Date(event.startDate), 'dd/MM/yyyy')} - {format(new Date(event.endDate), 'dd/MM/yyyy')}
                                        </p>
                                        <button className="button" onClick={handleButtonClick}>
                                            Participă
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    )
}