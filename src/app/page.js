"use client" // Указываем, что это клиентский компонент Next.js

// Импортируем необходимые хуки и компоненты из React и других библиотек
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
{/* Добавьте эти импорты в начало файла */}
import {
  Phone,
  MessageCircle,
  Clock,
  CreditCard,
  Car,
  Shield,
  CheckCircle,
  Star,
  ArrowRight,
  MapPin,
  Mail,
  Send,
} from "lucide-react" // Импортируем иконки из библиотеки lucide-react

// Константы для Telegram бота (ЗАМЕНИТЕ НА СВОИ!)
const YOUR_BOT_TOKEN = "7819865305:AAFDnSoal2oxSVce-ppf3f2Vt7r1XwwV6lY" // Получите у @BotFather
const YOUR_CHAT_ID = "-1002885585263" // Получите у @getmyid_bot

export default function CarBuyoutLanding() {
  // Состояния компонента:
  const [phone, setPhone] = useState('')
  // currentTestimonial - индекс текущего отображаемого отзыва
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  // isVisible - управляет анимацией появления компонента
  const [isVisible, setIsVisible] = useState(false)

  // Добавляем состояния для формы
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  // isClient - флаг для решения проблемы гидратации (рендеринг на сервере vs клиенте)
  const [isClient, setIsClient] = useState(false)

  // Рефы для секций страницы:
  const contactRef = useRef(null) // Ссылка на секцию контактов
  const advantagesRef = useRef(null) // Ссылка на секцию преимуществ
  const processRef = useRef(null) // Ссылка на секцию процесса работы

  // Ссылка на интервал для автоматического переключения отзывов
  const testimonialsInterval = useRef(null)

  // Эффект, выполняющийся при монтировании компонента
  useEffect(() => {
    setIsClient(true)
    setIsVisible(true)
    testimonialsInterval.current = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => {
      if (testimonialsInterval.current) {
        clearInterval(testimonialsInterval.current)
      }
    }
  }, [])

  // Новая функция обработки формы
  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const name = formData.get('name')
    const phone = formData.get('phone')
    const description = formData.get('description')

    if (!phone || phone.length < 5) {
      setSubmitStatus('error')
      alert('Пожалуйста, укажите корректный номер телефона')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch(
          `https://api.telegram.org/bot${YOUR_BOT_TOKEN}/sendMessage`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: YOUR_CHAT_ID,
              text: `🚗 Новая заявка на выкуп:\n\n👤 Имя: ${name}\n📞 Телефон: ${phone}\n🔍 Описание: ${description || 'Не указано'}`,
              parse_mode: 'HTML'
            })
          }
      )

      if (response.ok) {
        setSubmitStatus('success')
        e.target.reset()
        setPhone('') // Сбрасываем телефон
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
      console.error('Ошибка отправки:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Функция для плавного скролла к секциям с корректировкой положения
  const scrollToSection = (ref) => {
    if (ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop - 80, // Отступ сверху для компенсации фиксированной шапки
        behavior: "smooth" // Плавный скролл
      })
    }
  }

  // Функция для ручного переключения отзывов
  const handleTestimonialChange = (index) => {
    setCurrentTestimonial(index) // Устанавливаем новый индекс отзыва

    // Сбрасываем текущий интервал при ручном переключении
    if (testimonialsInterval.current) {
      clearInterval(testimonialsInterval.current)
    }

    // Запускаем новый интервал для продолжения автоматического переключения
    testimonialsInterval.current = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
  }

  // Массив данных отзывов
  const testimonials = [
    {
      text: "Быстро, чётко, дорого – продал машину за час!",
      author: "Артём, Нижний Новгород",
    },
    {
      text: "Оценили по фото, всё онлайн, без стресса.",
      author: "Мария, Самара",
    },
    {
      text: "Профессионалы, рекомендую всем!",
      author: "Павел, Москва",
    },
  ]

  // Функция генерации стилей для анимированных частиц (только на клиенте)
  const generateParticleStyles = () => {
    if (!isClient) return [] // На сервере не генерируем частицы

    // Создаем массив из 15 частиц со случайными позициями и параметрами анимации
    return Array(15).fill(0).map(() => ({
      left: `${Math.random() * 100}%`, // Случайная позиция по горизонтали
      top: `${Math.random() * 100}%`, // Случайная позиция по вертикали
      animationDelay: `${Math.random() * 3}s`, // Случайная задержка анимации
      animationDuration: `${2 + Math.random() * 3}s`, // Случайная длительность анимации
    }))
  }

  // Генерируем стили для частиц
  const particleStyles = generateParticleStyles()

  return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white overflow-hidden">
        {/* Шапка сайта с навигацией */}
        {/* Шапка сайта с навигацией */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/5 backdrop-blur-xl border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Логотип */}
              <div className="flex items-center space-x-2 flex-shrink-0">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-teal-400 to-blue-500 rounded-xl flex items-center justify-center">
                  <Car className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                </div>
                <span className="text-lg sm:text-xl font-bold text-white">АвтоВыкуп</span>
              </div>

              {/* Навигация - теперь абсолютно позиционирована по центру */}
              <nav className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex space-x-6 lg:space-x-8">
                <button
                    onClick={() => scrollToSection(advantagesRef)}
                    className="text-slate-300 hover:text-white transition-colors text-sm lg:text-base"
                >
                  Преимущества
                </button>
                <button
                    onClick={() => scrollToSection(processRef)}
                    className="text-slate-300 hover:text-white transition-colors text-sm lg:text-base"
                >
                  Как работаем
                </button>
                <button
                    onClick={() => scrollToSection(contactRef)}
                    className="text-slate-300 hover:text-white transition-colors text-sm lg:text-base"
                >
                  Контакты
                </button>
              </nav>

              {/* Контакты и кнопка */}
              <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
                <a
                    href="tel:+79524763291"
                    className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white rounded-xl text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 flex items-center justify-center transition-all duration-300 hover:scale-105"
                >
                  <Phone className="h-3 w-3 mr-1 sm:h-4 sm:w-4" />
                  Позвонить
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* Герой-секция с основным заголовком */}
        <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16">
          {/* Затемненный фон с размытием */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-blue-900/80 to-teal-900/70" />
          <div
              className="absolute inset-0 bg-cover bg-center opacity-20"
              style={{
                backgroundImage: `url('/placeholder.svg?height=1080&width=1920')`,
                filter: "blur(2px)",
              }}
          />

          {/*/!* Анимированные частицы (рендерим только на клиенте) *!/*/}
          {/*{isClient && (*/}
          {/*    <div className="absolute inset-0 overflow-hidden">*/}
          {/*      {particleStyles.map((style, i) => (*/}
          {/*          <div*/}
          {/*              key={i}*/}
          {/*              className="absolute w-1 h-1 bg-teal-400 rounded-full animate-pulse"*/}
          {/*              style={style}*/}
          {/*          />*/}
          {/*      ))}*/}
          {/*    </div>*/}
          {/*)}*/}

          {/* Основной контент герой-секции */}
          <div
              className={`relative z-10 text-center max-w-5xl mx-auto transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white via-teal-200 to-blue-200 bg-clip-text text-transparent leading-tight">
              Срочный выкуп авто
              <br />
              по всей РФ
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-slate-300 mb-8 sm:mb-12 font-light px-4">
              Максимальная цена, минимум хлопот – выкупим за 30 мин
            </p>

            <div className="relative inline-block">
              <Button
                  size="lg"
                  onClick={() => scrollToSection(contactRef)}
                  className="relative bg-white/10 backdrop-blur-md border-2 border-white/30 text-white hover:bg-white/20 hover:border-white/50 transition-all duration-500 px-8 sm:px-12 py-4 sm:py-6 text-lg sm:text-xl font-semibold rounded-2xl shadow-2xl hover:shadow-white/20 hover:scale-105 group"
              >
              <span className="flex items-center">
                Продать авто сейчас
                <ArrowRight className="ml-3 h-5 w-5 sm:h-6 sm:w-6 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
                <div className="absolute inset-0 bg-gradient-to-r from-teal-400/20 to-blue-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 -z-10"></div>
              </Button>
            </div>
          </div>
        </section>

        {/* Секция преимуществ */}
        <section
            className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 relative"
            ref={advantagesRef}
            id="advantages"
        >
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12 sm:mb-16 bg-gradient-to-r from-white to-teal-200 bg-clip-text text-transparent">
              Почему мы?
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {[
                { icon: Clock, title: "Сделка за 1 день", desc: "Быстрое оформление" },
                { icon: Car, title: "Бесплатная оценка с выездом", desc: "Приедем к вам" },
                { icon: CheckCircle, title: "Выкуп за 30 минут", desc: "Мгновенная сделка" },
                { icon: CreditCard, title: "Гибкие выплаты", desc: "Удобные условия" },
              ].map((item, index) => (
                  <Card
                      key={index}
                      className={`bg-white/5 backdrop-blur-lg border border-white/10 p-4 sm:p-6 rounded-3xl hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/20 ${
                          index % 2 === 0 ? "transform translate-y-2 sm:translate-y-4" : ""
                      }`}
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-teal-400 to-blue-500 rounded-2xl flex items-center justify-center mb-3 sm:mb-4 shadow-lg">
                        <item.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">{item.title}</h3>
                      <p className="text-slate-300 text-sm">{item.desc}</p>
                    </div>
                  </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Секция "Какие авто мы покупаем" */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-slate-900/50 to-blue-900/30 relative overflow-hidden">
          {/* Декоративные элементы */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-teal-500/10 rounded-full filter blur-3xl"></div>
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl"></div>
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-teal-200 bg-clip-text text-transparent">
                Любые авто – в любом состоянии
              </h2>
              <p className="text-lg sm:text-xl text-slate-300">
                Мы покупаем автомобили независимо от их состояния
              </p>
            </div>

            {/* Первый ряд карточек */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {/* Карточка 1 */}
              <div className="bg-gradient-to-br from-emerald-500/10 to-teal-600/10 backdrop-blur-lg border border-emerald-400/20 rounded-3xl p-6 hover:scale-[1.02] transition-all duration-300 cursor-pointer group">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                    <Car className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-1">С пробегом</h3>
                    <p className="text-emerald-300">Любой год выпуска</p>
                  </div>
                </div>
              </div>

              {/* Карточка 2 */}
              <div className="bg-gradient-to-br from-blue-500/10 to-indigo-600/10 backdrop-blur-lg border border-blue-400/20 rounded-3xl p-6 hover:scale-[1.02] transition-all duration-300 cursor-pointer group">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                    <CreditCard className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-1">Кредитные</h3>
                    <p className="text-blue-300">Поможем с банком</p>
                  </div>
                </div>
              </div>

              {/* Карточка 3 */}
              <div className="bg-gradient-to-br from-purple-500/10 to-pink-600/10 backdrop-blur-lg border border-purple-400/20 rounded-3xl p-6 hover:scale-[1.02] transition-all duration-300 cursor-pointer group">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-1">Залоговые</h3>
                    <p className="text-purple-300">Решим вопросы</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Второй ряд - растянутые карточки */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 sm:mb-12">
              {/* Карточка 4 - растянутая */}
              <div className="bg-gradient-to-br from-red-500/10 to-rose-600/10 backdrop-blur-lg border border-red-400/20 rounded-3xl p-6 hover:scale-[1.02] transition-all duration-300 cursor-pointer group">
                <div className="flex items-center space-x-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-red-400 to-rose-500 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                    <Car className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">Битые</h3>
                    <p className="text-red-300 text-lg sm:text-xl">Сильные повреждения</p>
                    <p className="text-slate-300 mt-2">Выкупаем даже "безнадежные"</p>
                  </div>
                </div>
              </div>

              {/* Карточка 5 - растянутая */}
              <div className="bg-gradient-to-br from-gray-500/10 to-slate-600/10 backdrop-blur-lg border border-gray-400/20 rounded-3xl p-6 hover:scale-[1.02] transition-all duration-300 cursor-pointer group">
                <div className="flex items-center space-x-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-gray-400 to-slate-500 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">Запретные</h3>
                    <p className="text-gray-300 text-lg sm:text-xl">Сложные случаи</p>
                    <p className="text-slate-300 mt-2">Наша специализация</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Большая заметная кнопка */}
            <div className="text-center">
              <Button
                  size="lg"
                  onClick={() => scrollToSection(contactRef)}
                  className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white px-10 sm:px-16 py-5 sm:py-6 rounded-2xl font-bold text-xl sm:text-2xl transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-teal-500/40 relative overflow-hidden group"
              >
                <span className="relative z-10">🚗 Получить деньги сегодня!</span>
                <span className="absolute inset-0 bg-gradient-to-r from-teal-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Button>
            </div>
          </div>
        </section>

        {/* Секция процесса работы */}
        <section
            className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8"
            ref={processRef}
            id="process"
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-4 sm:mb-6 bg-gradient-to-r from-white to-teal-200 bg-clip-text text-transparent">
              Как мы работаем
            </h2>
            <p className="text-center text-slate-300 text-lg sm:text-xl mb-12 sm:mb-16">
              Простой процесс от звонка до получения денег
            </p>

            <div className="relative">
              {/* Линия процесса (только на десктопе) */}
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 rounded-full transform -translate-y-1/2 opacity-30"></div>

              {/* Шаги процесса */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 relative z-10">
                {[
                  {
                    icon: "📞",
                    title: "Звоните или пишите",
                    desc: "Расскажите о своем авто",
                    time: "1 минута",
                    color: "from-green-400 to-emerald-500",
                  },
                  {
                    icon: "💰",
                    title: "Получите оценку",
                    desc: "Назовем цену по фото или при осмотре",
                    time: "5 минут",
                    color: "from-blue-400 to-cyan-500",
                  },
                  {
                    icon: "🤝",
                    title: "Заключаем сделку",
                    desc: "Оформляем документы и передаем деньги",
                    time: "30 минут",
                    color: "from-purple-400 to-pink-500",
                  },
                ].map((item, index) => (
                    <div key={index} className="text-center group">
                      <div
                          className={`w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br ${item.color} rounded-3xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 relative`}
                      >
                        <span className="text-3xl sm:text-4xl">{item.icon}</span>
                        <div className="absolute -top-2 -right-2 bg-white text-black text-xs font-bold px-2 py-1 rounded-full">
                          {item.time}
                        </div>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-white group-hover:text-teal-300 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-slate-300 text-base sm:text-lg">{item.desc}</p>
                    </div>
                ))}
              </div>
            </div>

            {/* Блок экспресс-оценки */}
            <div className="text-center mt-12 sm:mt-16">
              <div className="bg-gradient-to-r from-teal-500/10 to-blue-600/10 backdrop-blur-lg border border-teal-400/20 rounded-3xl p-6 sm:p-8 max-w-2xl mx-auto">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">⚡ Экспресс-оценка</h3>
                <p className="text-slate-300 mb-6 text-sm sm:text-base">
                  Пришлите фото авто в WhatsApp и получите предварительную оценку за 2 минуты!
                </p>
                <Button
                    size="lg"
                    asChild
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-bold transition-all duration-300 hover:scale-105 text-sm sm:text-base"
                >
                  <a
                      href="https://wa.me/79524763291"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center"
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Отправить фото в WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Секция отзывов */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-900/30 to-slate-900/50">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-12 sm:mb-16 bg-gradient-to-r from-white to-teal-200 bg-clip-text text-transparent">
              Нам доверяют
            </h2>

            {/* Контейнер для отзывов */}
            <div className="relative overflow-x-visible h-[320px]">
              <div className="flex items-center justify-center h-full">
                {testimonials.map((testimonial, index) => {
                  // Определяем позицию отзыва
                  const position = ((index - currentTestimonial + testimonials.length) % testimonials.length);
                  const isCenter = position === 0;

                  return (
                      <div
                          key={index}
                          className={`absolute transition-all duration-500 ease-in-out ${
                              isCenter
                                  ? "left-1/2 transform -translate-x-1/2 z-10 w-[320px] sm:w-[400px] scale-110"
                                  : position === 1
                                      ? "left-3/4 transform -translate-x-1/4 z-0 w-[280px] sm:w-[320px] scale-95"
                                      : "left-1/4 transform -translate-x-3/4 z-0 w-[280px] sm:w-[320px] scale-95"
                          }`}
                      >
                        <Card className={`
                bg-white/5 backdrop-blur-lg border ${isCenter ? "border-teal-400/50" : "border-white/20"}
                p-6 rounded-3xl h-[260px] flex flex-col
                ${isCenter ? "shadow-xl shadow-teal-500/20" : "opacity-90"}
              `}>
                          <div className="flex justify-center mb-4">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`${isCenter ? "h-5 w-5" : "h-4 w-4"} text-yellow-400 fill-current`} />
                            ))}
                          </div>
                          <blockquote className={`text-white mb-4 font-light italic flex-grow ${
                              isCenter ? "text-lg sm:text-xl" : "text-base sm:text-lg"
                          }`}>
                            "{testimonial.text}"
                          </blockquote>
                          <cite className={`${isCenter ? "text-teal-300" : "text-teal-400/80"} font-medium text-sm sm:text-base`}>
                            — {testimonial.author}
                          </cite>
                        </Card>
                      </div>
                  );
                })}
              </div>
            </div>

            {/* Индикаторы */}
            <div className="flex justify-center space-x-3 mt-12">
              {testimonials.map((_, index) => (
                  <button
                      key={index}
                      onClick={() => handleTestimonialChange(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === currentTestimonial
                              ? "bg-teal-400 w-6 scale-110"
                              : "bg-white/30 hover:bg-white/50"
                      }`}
                  />
              ))}
            </div>
          </div>
        </section>

        {/* Секция контактов - финальная версия */}
        <section
            className="relative py-12 sm:py-16 px-4 sm:px-6 overflow-hidden"
            ref={contactRef}
            id="contact"
        >
          {/* Декоративные элементы */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -right-20 -top-20 w-40 h-40 bg-teal-500/10 rounded-full blur-xl"></div>
            <div className="absolute -left-20 -bottom-20 w-48 h-48 bg-blue-500/10 rounded-full blur-xl"></div>
          </div>

          <div className="max-w-4xl mx-auto relative z-10">
            {/* Заголовок */}
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-12 sm:mb-16 bg-gradient-to-r from-white to-teal-200 bg-clip-text text-transparent">
                Свяжитесь с нами
              </h2>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
              {/* Обновлённая форма */}
              <div className="flex-1 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 sm:p-8 shadow-lg">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-white/70 text-sm mb-1">Ваше имя</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Иван Иванов"
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-teal-400/50 transition-all text-sm"
                        required
                    />
                  </div>
                  <div>
                    <label className="block text-white/70 text-sm mb-1">Номер телефона</label>
                    <PhoneInput
                        international
                        defaultCountry="RU"
                        name="phone"
                        value={phone}
                        onChange={setPhone}
                        placeholder="+7 (___) ___-__-__"
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-teal-400/50 transition-all [&>input]:bg-transparent [&>input]:text-white"
                        required
                    />
                  </div>
                  <div>
                    <label className="block text-white/70 text-sm mb-1">Описание машины</label>
                    <textarea
                        name="description"
                        placeholder="Марка, модель, год, пробег, состояние"
                        rows={3}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-teal-400/50 transition-all text-sm"
                    />
                  </div>
                  <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full ${
                          isSubmitting
                              ? 'bg-gray-500 cursor-not-allowed'
                              : 'bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-blue-600'
                      } text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-all duration-300 hover:shadow-md hover:shadow-teal-400/10 text-sm`}
                  >
                    {isSubmitting ? (
                        <span>Отправка...</span>
                    ) : (
                        <>
                          <Send className="h-4 w-4" />
                          <span>Отправить заявку</span>
                        </>
                    )}
                  </button>

                  {submitStatus === 'success' && (
                      <div className="mt-4 p-3 bg-green-500/10 border border-green-400/30 rounded-lg text-green-300 text-sm">
                        Заявка отправлена! Мы свяжемся с вами в ближайшее время.
                      </div>
                  )}

                  {submitStatus === 'error' && (
                      <div className="mt-4 p-3 bg-red-500/10 border border-red-400/30 rounded-lg text-red-300 text-sm">
                        Ошибка отправки. Пожалуйста, попробуйте ещё раз или свяжитесь другим способом.
                      </div>
                  )}
                </form>
              </div>

              {/* Контакты - выровнен по центру формы */}
              <div className="flex-1 flex flex-col justify-center">
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 sm:p-8 shadow-lg h-min">
                  <div className="space-y-5">
                    {/* Телефон */}
                    <a
                        href="tel:+79524763291"
                        className="flex items-start group"
                    >
                      <div className="bg-teal-500/10 p-2.5 rounded-lg mr-3 group-hover:bg-teal-500/20 transition-colors">
                        <Phone className="h-5 w-5 text-teal-400" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium text-sm">Телефон</h4>
                        <p className="text-teal-300 group-hover:text-teal-200 transition-colors text-sm">
                          +7 (952) 476-32-91
                        </p>
                      </div>
                    </a>

                    {/* WhatsApp */}
                    <a
                        href="https://wa.me/79524763291"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start group"
                    >
                      <div className="bg-green-500/10 p-2.5 rounded-lg mr-3 group-hover:bg-green-500/20 transition-colors">
                        <MessageCircle className="h-5 w-5 text-green-400" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium text-sm">WhatsApp</h4>
                        <p className="text-green-300 group-hover:text-green-200 transition-colors text-sm">
                          Написать сообщение
                        </p>
                      </div>
                    </a>

                    {/* Адрес */}
                    <a
                        href="https://yandex.ru/maps/?text=Нижегородская обл., Нижний Новгород, Деревообделочная ул., 2"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start group"
                    >
                      <div className="bg-blue-500/10 p-2.5 rounded-lg mr-3 group-hover:bg-blue-500/20 transition-colors">
                        <MapPin className="h-5 w-5 text-blue-400" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium text-sm">Адрес офиса</h4>
                        <p className="text-blue-300 group-hover:text-blue-200 transition-colors text-sm">
                          Н. Новгород, Деревообделочная ул., 2
                        </p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


{/* Подвал сайта */}
        <footer className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-slate-900/50">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              {/* Копирайт */}
              <div className="text-center md:text-left">
                <p className="text-slate-300 text-sm sm:text-base">Выкуп авто в РФ. © {new Date().getFullYear()}</p>
              </div>

              {/* Ссылки */}
              {/*<div className="flex flex-wrap justify-center space-x-4 sm:space-x-6">*/}
              {/*  <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm sm:text-base">*/}
              {/*    О нас*/}
              {/*  </a>*/}
              {/*  <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm sm:text-base">*/}
              {/*    Контакты*/}
              {/*  </a>*/}
              {/*  <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm sm:text-base">*/}
              {/*    Политика конфиденциальности*/}
              {/*  </a>*/}
              {/*</div>*/}

              {/* Социальные сети и контакты */}
              <div className="flex space-x-3 sm:space-x-4">
                {/* WhatsApp с подсказкой */}
                <a
                    href="https://wa.me/79524763291"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative w-8 h-8 sm:w-10 sm:h-10 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl flex items-center justify-center hover:bg-white/10 transition-all duration-300 cursor-pointer hover:scale-110 group"
                    aria-label="Написать в WhatsApp"
                >
                  <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 text-slate-400 hover:text-white transition-colors" />
                  <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            WhatsApp
          </span>
                </a>

                {/* Телефон с подсказкой */}
                <a
                    href="tel:+79524763291"
                    className="relative w-8 h-8 sm:w-10 sm:h-10 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl flex items-center justify-center hover:bg-white/10 transition-all duration-300 cursor-pointer hover:scale-110 group"
                    aria-label="Позвонить нам"
                >
                  <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-slate-400 hover:text-white transition-colors" />
                  <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Позвонить
          </span>
                </a>

          {/*      /!* Иконка защиты *!/*/}
          {/*      <div className="relative w-8 h-8 sm:w-10 sm:h-10 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl flex items-center justify-center hover:bg-white/10 transition-all duration-300 cursor-pointer hover:scale-110 group">*/}
          {/*        <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-slate-400 hover:text-white transition-colors" />*/}
          {/*        <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">*/}
          {/*  Гарантии*/}
          {/*</span>*/}
          {/*      </div>*/}
              </div>
            </div>
          </div>
        </footer>
      </div>
  )
}