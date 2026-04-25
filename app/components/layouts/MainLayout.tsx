import { Header } from '@/app/components/common/Header'
import { Footer } from '@/app/components/common/Footer'

interface MainLayoutProps {
  children: React.ReactNode
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1 container mx-auto p-4 bg-white">
        {children}
      </main>
      
      <Footer />
    </div>
  )
}