"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Brain, Sparkles, Search, TrendingUp, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";

import { apiPost, apiGet } from "@/lib/api";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { formatCurrency, formatPercent } from "@/utils/format";
import type {
  ApiResponse, Proposal, ProposalAnalysis,
  GeneratedProposal, InvestorMatch,
} from "@/types";

type Tab = "generate" | "analyze" | "match" | "chat";

export default function AIToolsPage() {
  const [tab, setTab] = useState<Tab>("generate");

  // Generate Proposal
  const [brief,      setBrief]      = useState("");
  const [generated,  setGenerated]  = useState<GeneratedProposal | null>(null);
  const [generating, setGenerating] = useState(false);

  // Analyze Proposal
  const [proposalId, setProposalId] = useState("");
  const [analysis,   setAnalysis]   = useState<ProposalAnalysis | null>(null);
  const [analyzing,  setAnalyzing]  = useState(false);

  // Match Investors
  const [matchId,   setMatchId]   = useState("");
  const [matches,   setMatches]   = useState<InvestorMatch[]>([]);
  const [matching,  setMatching]  = useState(false);

  // Chat
  const [chatMsg,  setChatMsg]  = useState("");
  const [chatHistory, setChatHistory] = useState<{ role: "user" | "ai"; text: string }[]>([]);
  const [chatting, setChatting] = useState(false);

  // Load proposals for selects
  const { data: proposalsRes } = useQuery({
    queryKey: ["proposals", "all"],
    queryFn:  () => apiGet<{ data: Proposal[] }>("/proposals?limit=50"),
  });
  const proposals = proposalsRes?.data ?? [];

  const runGenerate = async () => {
    if (!brief.trim()) return;
    setGenerating(true);
    try {
      const res = await apiPost<ApiResponse<GeneratedProposal>>("/ai/generate-proposal", { brief });
      setGenerated(res.data);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed");
    } finally { setGenerating(false); }
  };

  const runAnalyze = async () => {
    if (!proposalId) return;
    setAnalyzing(true);
    try {
      const res = await apiPost<ApiResponse<ProposalAnalysis>>("/ai/analyze-proposal", { proposalId });
      setAnalysis(res.data);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed");
    } finally { setAnalyzing(false); }
  };

  const runMatch = async () => {
    if (!matchId) return;
    setMatching(true);
    try {
      const res = await apiPost<ApiResponse<InvestorMatch[]>>("/ai/match-investors", { proposalId: matchId });
      setMatches(res.data);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed");
    } finally { setMatching(false); }
  };

  const sendChat = async () => {
    if (!chatMsg.trim()) return;
    const msg = chatMsg.trim();
    setChatHistory((h) => [...h, { role: "user", text: msg }]);
    setChatMsg("");
    setChatting(true);
    try {
      const res = await apiPost<ApiResponse<{ reply: string }>>("/ai/chat", { message: msg });
      setChatHistory((h) => [...h, { role: "ai", text: res.data?.reply ?? "..." }]);
    } catch (err) {
      setChatHistory((h) => [...h, { role: "ai", text: "Sorry, I had an error. Try again." }]);
    } finally { setChatting(false); }
  };

  const tabs: { key: Tab; icon: string; label: string }[] = [
    { key: "generate", icon: "✨", label: "Generate Proposal" },
    { key: "analyze",  icon: "🔍", label: "Risk Analysis"     },
    { key: "match",    icon: "🤝", label: "Match Investors"   },
    { key: "chat",     icon: "💬", label: "AI Advisor"        },
  ];

  return (
    <DashboardShell>
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Brain className="h-6 w-6 text-purple-600" /> AI Tools
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Powered by Claude AI — 4 intelligent features for smarter investing
        </p>
      </div>

      {/* Tab nav */}
      <div className="flex gap-1 bg-muted rounded-xl p-1">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex-1 rounded-lg py-2.5 text-xs font-medium transition-all ${
              tab === t.key
                ? "bg-white shadow text-purple-700"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <span className="mr-1">{t.icon}</span>
            <span className="hidden sm:inline">{t.label}</span>
          </button>
        ))}
      </div>

      {/* ── Feature 1: Generate Proposal ──────────────────────────────────── */}
      {tab === "generate" && (
        <div className="noor-card p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-coral-500" />
            <h3 className="font-semibold">AI Proposal Generator</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Describe your business idea in plain language. Claude AI will write a professional,
            Shariah-compliant business proposal for you.
          </p>
          <textarea
            value={brief}
            onChange={(e) => setBrief(e.target.value)}
            rows={4}
            placeholder="e.g. I want to open an organic halal meat shop in Chittagong. Target customers are middle-class families. I need 3 lakhs to rent a shop and buy initial stock..."
            className="w-full rounded-lg border px-3 py-2.5 text-sm resize-none outline-none focus:ring-2 focus:ring-coral-400"
          />
          <button
            onClick={runGenerate}
            disabled={generating || !brief.trim()}
            className="flex items-center gap-2 rounded-lg bg-coral-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-coral-600 disabled:opacity-60 transition-colors"
          >
            {generating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Brain className="h-4 w-4" />}
            {generating ? "Generating..." : "Generate Proposal"}
          </button>

          {generated && (
            <div className="rounded-xl border border-coral-200 bg-coral-50/50 p-5 space-y-3">
              <h4 className="font-bold text-lg">{generated.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{generated.description}</p>
              <div>
                <span className="text-xs font-semibold text-coral-700">Revenue Model: </span>
                <span className="text-xs text-muted-foreground">{generated.revenueModel}</span>
              </div>
              <div>
                <span className="text-xs font-semibold block mb-1">Key Points:</span>
                <ul className="space-y-1">
                  {generated.keyPoints.map((kp, i) => (
                    <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
                      <span className="text-coral-500 mt-0.5">•</span>{kp}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-wrap gap-1">
                {generated.tags.map((t) => (
                  <span key={t} className="rounded-md bg-coral-100 px-2 py-0.5 text-xs text-coral-700">{t}</span>
                ))}
              </div>
              <a
                href="/proposals/create"
                className="inline-flex items-center gap-2 rounded-lg bg-coral-500 px-4 py-2 text-sm font-medium text-white hover:bg-coral-600 transition-colors"
              >
                Use This → Create Proposal
              </a>
            </div>
          )}
        </div>
      )}

      {/* ── Feature 2: Risk Analysis ──────────────────────────────────────── */}
      {tab === "analyze" && (
        <div className="noor-card p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Search className="h-5 w-5 text-purple-600" />
            <h3 className="font-semibold">Proposal Risk Analysis</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Get Claude AI's detailed risk assessment, Shariah compliance check, and viability score.
          </p>
          <div className="flex gap-3">
            <select
              value={proposalId}
              onChange={(e) => setProposalId(e.target.value)}
              className="flex-1 rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="">Select a proposal...</option>
              {proposals.map((p) => (
                <option key={p.id} value={p.id}>{p.title}</option>
              ))}
            </select>
            <button
              onClick={runAnalyze}
              disabled={analyzing || !proposalId}
              className="flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 disabled:opacity-60 transition-colors"
            >
              {analyzing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Brain className="h-4 w-4" />}
              Analyze
            </button>
          </div>

          {analysis && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-xl bg-purple-50 p-4 text-center">
                  <div className="text-3xl font-bold text-purple-700">{analysis.riskScore}<span className="text-sm">/10</span></div>
                  <div className="text-xs text-muted-foreground mt-1">Risk Score</div>
                </div>
                <div className="rounded-xl bg-emerald-50 p-4 text-center">
                  <div className="text-3xl font-bold text-emerald-700">{analysis.viabilityScore}<span className="text-sm">/10</span></div>
                  <div className="text-xs text-muted-foreground mt-1">Viability</div>
                </div>
                <div className={`rounded-xl p-4 text-center ${analysis.shariahCompliance.compliant ? "bg-green-50" : "bg-red-50"}`}>
                  <div className={`text-3xl font-bold ${analysis.shariahCompliance.compliant ? "text-green-700" : "text-red-600"}`}>
                    {analysis.shariahCompliance.compliant ? "✓" : "✗"}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">Shariah</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium mb-2 flex items-center gap-1.5 text-emerald-700">
                    <CheckCircle className="h-4 w-4" /> Strengths
                  </h4>
                  <ul className="space-y-1.5">
                    {analysis.strengths.map((s, i) => (
                      <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
                        <span className="text-emerald-500 mt-0.5">✓</span>{s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2 flex items-center gap-1.5 text-coral-700">
                    <AlertCircle className="h-4 w-4" /> Weaknesses
                  </h4>
                  <ul className="space-y-1.5">
                    {analysis.weaknesses.map((w, i) => (
                      <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
                        <span className="text-coral-500 mt-0.5">⚠</span>{w}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="rounded-lg bg-blue-50 p-4">
                <h4 className="text-sm font-medium text-blue-700 mb-2">Suggestions</h4>
                <ul className="space-y-1">
                  {analysis.suggestions.map((s, i) => (
                    <li key={i} className="text-xs text-blue-700/80">→ {s}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── Feature 3: Investor Matching ─────────────────────────────────── */}
      {tab === "match" && (
        <div className="noor-card p-6 space-y-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-emerald-600" />
            <h3 className="font-semibold">AI Investor Matching</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Claude AI analyzes investor profiles and matches them to your proposal based on
            risk tolerance, sector preference, and investment history.
          </p>
          <div className="flex gap-3">
            <select
              value={matchId}
              onChange={(e) => setMatchId(e.target.value)}
              className="flex-1 rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-400"
            >
              <option value="">Select your proposal...</option>
              {proposals.filter(p => ["ACTIVE", "FUNDED", "APPROVED"].includes(p.status)).map((p) => (
                <option key={p.id} value={p.id}>{p.title}</option>
              ))}
            </select>
            <button
              onClick={runMatch}
              disabled={matching || !matchId}
              className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-60 transition-colors"
            >
              {matching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Brain className="h-4 w-4" />}
              Find Matches
            </button>
          </div>

          {matches.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-semibold">Best Investor Matches</h4>
              {matches.map((m, i) => (
                <div key={m.investorId} className="flex items-start gap-3 rounded-lg border p-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 font-bold text-sm">
                    #{i + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm">{m.name}</span>
                      <span className={`text-sm font-bold ${m.score >= 7 ? "text-emerald-600" : m.score >= 5 ? "text-coral-600" : "text-red-600"}`}>
                        {m.score}/10 match
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{m.reasoning}</p>
                    <span className="mt-1 inline-block text-xs bg-muted rounded px-2 py-0.5">
                      Risk: {m.riskTolerance}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Feature 4: AI Chat Advisor ────────────────────────────────────── */}
      {tab === "chat" && (
        <div className="noor-card flex flex-col" style={{ height: "calc(100vh - 280px)", minHeight: 400 }}>
          <div className="flex items-center gap-2 px-5 py-4 border-b">
            <Brain className="h-5 w-5 text-purple-600" />
            <h3 className="font-semibold">Noor AI Advisor</h3>
            <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full ml-auto">
              Powered by Claude
            </span>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {chatHistory.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Brain className="h-12 w-12 mx-auto mb-3 opacity-30" />
                <p className="text-sm font-medium">Assalamu Alaikum! I'm your Noor AI Advisor.</p>
                <p className="text-xs mt-1">Ask me anything about halal investing, Musharakah, or financial planning.</p>
                <div className="flex flex-wrap gap-2 justify-center mt-4">
                  {[
                    "What is Musharakah?",
                    "How do I pick a halal investment?",
                    "What is riba?",
                    "Tips for first-time investors",
                  ].map((s) => (
                    <button
                      key={s}
                      onClick={() => { setChatMsg(s); }}
                      className="rounded-full border px-3 py-1.5 text-xs text-muted-foreground hover:bg-muted transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {chatHistory.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-coral-500 text-white rounded-br-sm"
                    : "bg-muted text-foreground rounded-bl-sm"
                }`}>
                  {msg.role === "ai" && (
                    <div className="flex items-center gap-1.5 mb-1">
                      <Brain className="h-3 w-3 text-purple-600" />
                      <span className="text-xs font-semibold text-purple-600">Noor AI</span>
                    </div>
                  )}
                  {msg.text}
                </div>
              </div>
            ))}
            {chatting && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-2xl rounded-bl-sm px-4 py-3">
                  <div className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-purple-600 animate-bounce" />
                    <span className="h-1.5 w-1.5 rounded-full bg-purple-600 animate-bounce [animation-delay:0.1s]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-purple-600 animate-bounce [animation-delay:0.2s]" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t p-4 flex gap-3">
            <input
              value={chatMsg}
              onChange={(e) => setChatMsg(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendChat()}
              placeholder="Ask about halal investing, Musharakah, proposal advice..."
              className="flex-1 rounded-xl border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-purple-400"
            />
            <button
              onClick={sendChat}
              disabled={chatting || !chatMsg.trim()}
              className="rounded-xl bg-purple-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-purple-700 disabled:opacity-60 transition-colors flex items-center gap-2"
            >
              {chatting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send"}
            </button>
          </div>
        </div>
      )}
    </div>
    </DashboardShell>
  );
}
