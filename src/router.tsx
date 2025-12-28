import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Landing } from './screens/Landing';
import { Home } from './screens/Home';
import { Projects } from './screens/Projects';
import { ProjectDetail } from './screens/ProjectDetail';
import { ProposalCreate } from './screens/ProposalCreate';
import { ProposalHistory } from './screens/ProposalHistory';
import { Nomad } from './screens/Nomad';
import { Wallet } from './screens/Wallet';
import { Profile } from './screens/Profile';
import { Favorites } from './screens/Favorites';
import { Settings } from './screens/Settings';
import { AchievementsPage } from './screens/AchievementsPage';
import { Referral } from './screens/Referral';
import { ContractManagement } from './screens/ContractManagement';
import { Disputes } from './screens/Disputes';
import { AdminDashboard } from './screens/AdminDashboard';
import { Reviews } from './screens/Reviews';
import { Analytics } from './screens/Analytics';
import { Portfolio } from './screens/Portfolio';
import { FiscalReports } from './screens/FiscalReports';
import { Notifications } from './screens/Notifications';
import { TrustScore } from './screens/TrustScore';
import { LanguageRegion } from './screens/LanguageRegion';
import { Integrations } from './screens/Integrations';
import { Insights } from './screens/Insights';
import { Pricing } from './screens/Pricing';
import { Checkout } from './screens/Checkout';
import { CheckoutSuccess } from './screens/CheckoutSuccess';
import { AIProposal } from './screens/AIProposal';
import { AIDelivery } from './screens/AIDelivery';
import { CorporatePanel } from './screens/CorporatePanel';
import { TemplatesMarketplace } from './screens/TemplatesMarketplace';
import { ProSupport } from './screens/ProSupport';
import { ProjectPublish } from './screens/ProjectPublish';
import { ProposalsReceived } from './screens/ProposalsReceived';
import { Chat } from './screens/Chat';
import { Auth } from './screens/Auth';
import { PaymentMethods } from './screens/PaymentMethods';
import { Withdraw } from './screens/Withdraw';
import { Deposit } from './screens/Deposit';
import { ProjectSearch } from './screens/ProjectSearch';
import { Onboarding } from './screens/Onboarding';
import { RegisterFreelancer } from './screens/RegisterFreelancer';
import { RegisterClient } from './screens/RegisterClient';
import { Tour } from './screens/Tour';
import { ErrorPage } from './screens/ErrorPage';
import { ForgotPassword } from './screens/ForgotPassword';
import { ProjectFilters } from './screens/ProjectFilters';
import { ContractDetail } from './screens/ContractDetail';
import { DisputeForm } from './screens/DisputeForm';
import { Templates } from './screens/Templates';
import { Community } from './screens/Community';
import { Mentorships } from './screens/Mentorships';
import { ThemeProvider } from './contexts/ThemeContext';
import { UserRoleProvider } from './contexts/UserRoleContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { OnboardingProvider } from './contexts/OnboardingContext';
import { ToastProvider } from './components/Toast';
import { ErrorBoundary } from './components/ErrorBoundary';

export function AppRouter() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ThemeProvider>
          <UserRoleProvider>
            <NotificationProvider>
              <FavoritesProvider>
                <OnboardingProvider>
                  <ToastProvider>
                    <Routes>
                      {/* Landing Page - Sem Layout */}
                      <Route path="/landing" element={<Landing />} />
                      
                      {/* App Routes - Com Layout */}
                      <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="projects" element={<Projects />} />
                        <Route path="projects/:id" element={<ProjectDetail />} />
                        <Route path="projects/:projectId/proposal" element={<ProposalCreate />} />
                        <Route path="projects/:projectId/proposal-history" element={<ProposalHistory />} />
                        <Route path="nomad" element={<Nomad />} />
                        <Route path="wallet" element={<Wallet />} />
                        <Route path="profile" element={<Profile />} />
                        <Route path="favorites" element={<Favorites />} />
                        <Route path="settings" element={<Settings />} />
                        <Route path="achievements" element={<AchievementsPage />} />
                        <Route path="referral" element={<Referral />} />
                        <Route path="contracts/:contractId" element={<ContractManagement />} />
                        <Route path="contracts/:contractId/dispute" element={<Disputes />} />
                        <Route path="admin" element={<AdminDashboard />} />
                        <Route path="reviews/:contractId?" element={<Reviews />} />
                        <Route path="analytics" element={<Analytics />} />
                        <Route path="portfolio" element={<Portfolio />} />
                        <Route path="fiscal-reports" element={<FiscalReports />} />
                        <Route path="notifications" element={<Notifications />} />
                        <Route path="chat" element={<Chat />} />
                        <Route path="chat/:chatId" element={<Chat />} />
                        {/* Fase 3 Routes */}
                        <Route path="trust-score" element={<TrustScore />} />
                        <Route path="language-region" element={<LanguageRegion />} />
                        <Route path="integrations" element={<Integrations />} />
                        <Route path="insights" element={<Insights />} />
                        {/* Fase 4 - Monetização e IA */}
                        <Route path="pricing" element={<Pricing />} />
                        <Route path="checkout" element={<Checkout />} />
                        <Route path="checkout-success" element={<CheckoutSuccess />} />
                        <Route path="ai-proposal" element={<AIProposal />} />
                        <Route path="ai-delivery" element={<AIDelivery />} />
                        <Route path="corporate-panel" element={<CorporatePanel />} />
                        <Route path="templates-marketplace" element={<TemplatesMarketplace />} />
                        <Route path="pro-support" element={<ProSupport />} />
                        <Route path="project-publish" element={<ProjectPublish />} />
                        <Route path="proposals-received" element={<ProposalsReceived />} />
                        <Route path="payment-methods" element={<PaymentMethods />} />
                        <Route path="withdraw" element={<Withdraw />} />
                        <Route path="deposit" element={<Deposit />} />
                        <Route path="project-search" element={<ProjectSearch />} />
                        <Route path="onboarding" element={<Onboarding />} />
                        <Route path="register/freelancer" element={<RegisterFreelancer />} />
                        <Route path="register/client" element={<RegisterClient />} />
                        <Route path="tour" element={<Tour />} />
                        <Route path="proposal-history" element={<ProposalHistory />} />
                        <Route path="error" element={<ErrorPage />} />
                        <Route path="forgot-password" element={<ForgotPassword />} />
                        <Route path="project-filters" element={<ProjectFilters />} />
                        <Route path="contract-detail/:id" element={<ContractDetail />} />
                        <Route path="dispute/new/:contractId" element={<DisputeForm />} />
                        <Route path="templates" element={<Templates />} />
                        <Route path="community" element={<Community />} />
                        <Route path="mentorships" element={<Mentorships />} />
                      </Route>
                      <Route path="/auth" element={<Auth />} />
                    </Routes>
                  </ToastProvider>
                </OnboardingProvider>
              </FavoritesProvider>
            </NotificationProvider>
          </UserRoleProvider>
        </ThemeProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}