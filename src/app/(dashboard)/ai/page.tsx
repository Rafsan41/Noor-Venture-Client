"use client";

import { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Brain, Sparkles, Search, TrendingUp, Loader2,
  CheckCircle, AlertCircle, Send, RotateCcw,
} from "lucide-react";
import { toast } from "sonner";

import { apiPost, apiGet } from "@/lib/api";
import { DashboardShell }  from "@/components/layout/DashboardShell";
import { formatCurrency, formatPercent } from "@/utils/format";
import type {
  ApiResponse, Proposal, ProposalAnalysis,
  GeneratedProposal, InvestorMatch,
} from "@/types";

type Tab = "generate" | "analyze" | "match" | "chat";

const TABS: { key: Tab; icon: React.ReactNode; label: string; color: string }[] = [
  { key: "generate", icon: <Sparkles className="h-4 w-4" />, label: "Generate",  color: "var(--coral)"  },
  { key: "analyze",  icon: <Search    className="h-4 w-4" />, label: "Risk AI",   color: "var(--purple)" },
  { key: "match",    icon: <TrendingUp className="h-4 w-4"/>, label: "Match",     color: "#10b981"       },
  { key: "chat",     icon: <Brain     className="h-4 w-4" />, label: "Advisor",   color: "var(--pink)"   },
];

const CARD = {
  background: "var(--surface)",
  border: "1.5px solid var(--line)",
  borderRadius: 20,
};

const INPUT_STYLE = {
  borderColor: "var(--line)",
  background: "var(--paper-2)",
  fontFamily: "inherit",
  color: "var(--ink)",
};

export default function AIToolsPage() {
  const [tab, setTab] = useState<Tab>("generate");

  const [brief,      setBrief]      = useState("");
  const [generated,  setGenerated]  = useState<GeneratedProposal | null>(null);
  const [generating, setGenerating] = useState(false);

  const [proposalId, setProposalId] = useState("");
  const [analysis,   setAnalysis]   = useState<ProposalAnalysis | null>(null);
  const [analyzing,  setAnalyzing]  = useState(false);

  const [matchId,   setMatchId]   = useState("");
  const [matches,   setMatches]   = useState<InvestorMatch[]>([]);
  const [matching,  setMatching]  = useState(false);

  const [chatMsg,     setChatMsg]     = useState("");
  const [chatHistory, setChatHistory] = useState<{ role: "user" | "ai"; text: string }[]>([]);
  const [chatting,    setChatting]    = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const { data: proposalsRes } = useQuery({
    queryKey: ["proposals", "all"],
    queryFn:  () => apiGet<{ data: Proposal[] }>("/proposals?limit=50"),
  });
  const proposals = proposalsRes?.data ?? [];

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, chatting]);

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
    } catch {
      setChatHistory((h) => [...h, { role: "ai", text: "Sorry, I encountered an error. Please try again." }]);
    } finally { setChatting(false); }
  };

  const activeTab = TABS.find((t) => t.key === tab)!;

  return (
    <DashboardShell>
      <div className="mx-auto max-w-4xl space-y-6">

        {/* Page header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="font-display flex items-center gap-2.5 text-2xl font-semibold" style={{ letterSpacing: "-0.02em" }}>
              <div
                className="flex h-9 w-9 items-center justify-center rounded-xl"
                style={{ background: "linear-gradient(135deg, var(--purple), var(--pink))" }}
              >
                <Brain className="h-5 w-5 text-white" />
              </div>
              NoorAI Tools
            </h1>
            <p className="mt-1 text-sm" style={{ color: "var(--ink-soft)" }}>
              4 intelligent features powered by Claude — for smarter ethical investing
            </p>
          </div>
          <div
            className="rounded-full px-3 py-1.5 text-xs font-semibold"
            style={{ background: "var(--paper-2)", color: "var(--purple)", border: "1px solid var(--line)" }}
          >
            Powered by Claude
          </div>
        </div>

        {/* Tab navigation */}
        <div
          className="flex gap-1 rounded-2xl p-1.5"
          style={{ background: "var(--paper-2)", border: "1.5px solid var(--line)" }}
        >
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition-all"
              style={
                tab === t.key
                  ? { background: "var(--surface)", color: t.color, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }
                  : { color: "var(--ink-soft)" }
              }
            >
              <span style={{ color: tab === t.key ? t.color : "var(--ink-soft)" }}>{t.icon}</span>
              <span className="hidden sm:inline">{t.label}</span>
            </button>
          ))}
        </div>

        {/* ── Generate Proposal ──────────────────────────────────────────────── */}
        {tab === "generate" && (
          <div className="space-y-4 p-6" style={CARD}>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: "rgba(255,144,113,0.15)" }}>
                <Sparkles className="h-5 w-5" style={{ color: "var(--coral)" }} />
              </div>
              <div>
                <h3 className="font-semibold" style={{ color: "var(--ink)" }}>AI Proposal Generator</h3>
                <p className="text-xs" style={{ color: "var(--ink-soft)" }}>Describe your idea — Claude writes the full proposal</p>
              </div>
            </div>

            <textarea
              value={brief}
              onChange={(e) => setBrief(e.target.value)}
              rows={4}
              placeholder="e.g. I want to open an organic food shop in Dhaka. Target customers are health-conscious families. I need ৳3 lakhs to rent a space and buy initial stock..."
              className="w-full resize-none rounded-xl border px-4 py-3 text-sm outline-none transition-shadow focus:ring-2"
              style={INPUT_STYLE}
            />

            <div className="flex items-center gap-3">
              <button
                onClick={runGenerate}
                disabled={generating || !brief.trim()}
                className="flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold text-white disabled:opacity-50 transition-opacity hover:opacity-90"
                style={{ background: "var(--grad)" }}
              >
                {generating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                {generating ? "Generating…" : "Generate Proposal"}
              </button>
              {generated && (
                <button onClick={() => setGenerated(null)} className="flex items-center gap-1.5 text-sm" style={{ color: "var(--ink-soft)" }}>
                  <RotateCcw className="h-3.5 w-3.5" /> Reset
                </button>
              )}
            </div>

            {generated && (
              <div
                className="space-y-4 rounded-2xl p-5"
                style={{ background: "rgba(255,144,113,0.06)", border: "1.5px solid rgba(255,144,113,0.2)" }}
              >
                <h4 className="text-lg font-bold" style={{ color: "var(--ink)" }}>{generated.title}</h4>
                <p className="text-sm leading-relaxed" style={{ color: "var(--ink-soft)" }}>{generated.description}</p>
                <div className="text-sm">
                  <span className="font-semibold" style={{ color: "var(--coral)" }}>Revenue model: </span>
                  <span style={{ color: "var(--ink-soft)" }}>{generated.revenueModel}</span>
                </div>
                <div>
                  <span className="mb-2 block text-xs font-bold uppercase tracking-wider" style={{ color: "var(--ink-soft)" }}>Key Points</span>
                  <ul className="space-y-1.5">
                    {generated.keyPoints.map((kp, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--ink-soft)" }}>
                        <span style={{ color: "var(--coral)" }} className="mt-0.5">→</span>{kp}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {generated.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full px-2.5 py-0.5 text-xs font-semibold"
                      style={{ background: "var(--paper-2)", color: "var(--ink-soft)", border: "1px solid var(--line)" }}
                    >{t}</span>
                  ))}
                </div>
                <a
                  href="/proposals/create"
                  className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
                  style={{ background: "var(--grad)" }}
                >
                  Use this → Create Proposal
                </a>
              </div>
            )}
          </div>
        )}

        {/* ── Risk Analysis ──────────────────────────────────────────────────── */}
        {tab === "analyze" && (
          <div className="space-y-4 p-6" style={CARD}>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: "rgba(167,60,203,0.12)" }}>
                <Search className="h-5 w-5" style={{ color: "var(--purple)" }} />
              </div>
              <div>
                <h3 className="font-semibold" style={{ color: "var(--ink)" }}>Proposal Risk Analysis</h3>
                <p className="text-xs" style={{ color: "var(--ink-soft)" }}>Shariah compliance check + viability score</p>
              </div>
            </div>

            <div className="flex gap-3">
              <select
                value={proposalId}
                onChange={(e) => setProposalId(e.target.value)}
                className="flex-1 rounded-xl border px-4 py-2.5 text-sm outline-none focus:ring-2"
                style={INPUT_STYLE}
              >
                <option value="">Select a proposal…</option>
                {proposals.map((p) => (
                  <option key={p.id} value={p.id}>{p.title}</option>
                ))}
              </select>
              <button
                onClick={runAnalyze}
                disabled={analyzing || !proposalId}
                className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white disabled:opacity-50 transition-opacity hover:opacity-90"
                style={{ background: "var(--purple)" }}
              >
                {analyzing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Brain className="h-4 w-4" />}
                Analyze
              </button>
            </div>

            {analysis && (
              <div className="space-y-4">
                {/* Score row */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Risk Score",  value: `${analysis.riskScore}/10`,     color: "var(--coral)",  bg: "rgba(255,144,113,0.1)"  },
                    { label: "Viability",   value: `${analysis.viabilityScore}/10`, color: "#10b981",       bg: "rgba(16,185,129,0.1)"   },
                    {
                      label: "Shariah",
                      value: analysis.shariahCompliance.compliant ? "✓ Pass" : "✗ Fail",
                      color: analysis.shariahCompliance.compliant ? "#10b981" : "#ef4444",
                      bg:    analysis.shariahCompliance.compliant ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)",
                    },
                  ].map((s) => (
                    <div key={s.label} className="rounded-2xl p-4 text-center" style={{ background: s.bg, border: `1px solid ${s.color}30` }}>
                      <div className="font-display text-2xl font-bold" style={{ color: s.color }}>{s.value}</div>
                      <div className="mt-1 text-xs font-medium" style={{ color: "var(--ink-soft)" }}>{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* Strengths & weaknesses */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl p-4" style={{ background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.2)" }}>
                    <h4 className="mb-3 flex items-center gap-1.5 text-sm font-semibold" style={{ color: "#10b981" }}>
                      <CheckCircle className="h-4 w-4" /> Strengths
                    </h4>
                    <ul className="space-y-1.5">
                      {analysis.strengths.map((s, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-xs" style={{ color: "var(--ink-soft)" }}>
                          <span style={{ color: "#10b981" }} className="mt-0.5">✓</span>{s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-xl p-4" style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.2)" }}>
                    <h4 className="mb-3 flex items-center gap-1.5 text-sm font-semibold" style={{ color: "#ef4444" }}>
                      <AlertCircle className="h-4 w-4" /> Risks
                    </h4>
                    <ul className="space-y-1.5">
                      {analysis.weaknesses.map((w, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-xs" style={{ color: "var(--ink-soft)" }}>
                          <span style={{ color: "#ef4444" }} className="mt-0.5">⚠</span>{w}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="rounded-xl p-4" style={{ background: "rgba(167,60,203,0.06)", border: "1px solid rgba(167,60,203,0.2)" }}>
                  <h4 className="mb-2 text-sm font-semibold" style={{ color: "var(--purple)" }}>AI Suggestions</h4>
                  <ul className="space-y-1">
                    {analysis.suggestions.map((s, i) => (
                      <li key={i} className="text-xs" style={{ color: "var(--ink-soft)" }}>→ {s}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── Investor Matching ─────────────────────────────────────────────── */}
        {tab === "match" && (
          <div className="space-y-4 p-6" style={CARD}>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: "rgba(16,185,129,0.12)" }}>
                <TrendingUp className="h-5 w-5" style={{ color: "#10b981" }} />
              </div>
              <div>
                <h3 className="font-semibold" style={{ color: "var(--ink)" }}>AI Investor Matching</h3>
                <p className="text-xs" style={{ color: "var(--ink-soft)" }}>
                  Find the best-fit investors for your proposal based on risk profile and sector preference
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <select
                value={matchId}
                onChange={(e) => setMatchId(e.target.value)}
                className="flex-1 rounded-xl border px-4 py-2.5 text-sm outline-none focus:ring-2"
                style={INPUT_STYLE}
              >
                <option value="">Select your proposal…</option>
                {proposals.filter((p) => ["ACTIVE","FUNDED","APPROVED"].includes(p.status)).map((p) => (
                  <option key={p.id} value={p.id}>{p.title}</option>
                ))}
              </select>
              <button
                onClick={runMatch}
                disabled={matching || !matchId}
                className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white disabled:opacity-50 transition-opacity hover:opacity-90"
                style={{ background: "#10b981" }}
              >
                {matching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Brain className="h-4 w-4" />}
                Find Matches
              </button>
            </div>

            {matches.length > 0 && (
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--ink-soft)" }}>
                  Best Investor Matches
                </p>
                {matches.map((m, i) => (
                  <div
                    key={m.investorId}
                    className="flex items-start gap-4 rounded-2xl p-4"
                    style={{ background: "var(--paper-2)", border: "1px solid var(--line)" }}
                  >
                    <div
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white"
                      style={{ background: i === 0 ? "#10b981" : i === 1 ? "var(--coral)" : "var(--purple)" }}
                    >
                      #{i + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-sm" style={{ color: "var(--ink)" }}>{m.name}</span>
                        <span
                          className="font-display text-sm font-bold"
                          style={{ color: m.score >= 7 ? "#10b981" : m.score >= 5 ? "var(--coral)" : "#ef4444" }}
                        >
                          {m.score}/10 match
                        </span>
                      </div>
                      <p className="mt-1 text-xs leading-relaxed" style={{ color: "var(--ink-soft)" }}>{m.reasoning}</p>
                      <span
                        className="mt-2 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium"
                        style={{ background: "var(--surface)", color: "var(--ink-soft)", border: "1px solid var(--line)" }}
                      >
                        Risk tolerance: {m.riskTolerance}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── AI Chat Advisor ────────────────────────────────────────────────── */}
        {tab === "chat" && (
          <div
            className="flex flex-col overflow-hidden"
            style={{ ...CARD, height: "calc(100vh - 280px)", minHeight: 480 }}
          >
            {/* Chat header */}
            <div
              className="flex items-center gap-3 px-5 py-4"
              style={{ borderBottom: "1px solid var(--line)" }}
            >
              <div
                className="flex h-9 w-9 items-center justify-center rounded-xl"
                style={{ background: "linear-gradient(135deg, var(--purple), var(--pink))" }}
              >
                <Brain className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="font-semibold text-sm" style={{ color: "var(--ink)" }}>Noor AI Advisor</div>
                <div className="text-xs" style={{ color: "var(--ink-soft)" }}>Ethical finance expert · Powered by Claude</div>
              </div>
              <div
                className="ml-auto flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
                style={{ background: "rgba(167,60,203,0.1)", color: "var(--purple)" }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--purple)] animate-pulse" />
                Online
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-4 overflow-y-auto p-5">
              {chatHistory.length === 0 && (
                <div className="flex flex-col items-center justify-center gap-4 py-10 text-center">
                  <div
                    className="flex h-16 w-16 items-center justify-center rounded-2xl"
                    style={{ background: "linear-gradient(135deg, var(--purple), var(--pink))" }}
                  >
                    <Brain className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold" style={{ color: "var(--ink)" }}>Hello! I&apos;m your Noor AI Advisor.</p>
                    <p className="mt-1 text-sm" style={{ color: "var(--ink-soft)" }}>
                      Ask me about ethical investing, Musharakah, or any financial question.
                    </p>
                  </div>
                  <div className="flex flex-wrap justify-center gap-2">
                    {[
                      "What is Musharakah?",
                      "How to evaluate a proposal?",
                      "What is riba?",
                      "First-time investor tips",
                    ].map((s) => (
                      <button
                        key={s}
                        onClick={() => setChatMsg(s)}
                        className="rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors"
                        style={{
                          background: "var(--paper-2)",
                          color: "var(--ink-soft)",
                          border: "1px solid var(--line)",
                        }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {chatHistory.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.role === "ai" && (
                    <div
                      className="mr-2 flex h-7 w-7 shrink-0 items-center justify-center self-end rounded-lg"
                      style={{ background: "linear-gradient(135deg, var(--purple), var(--pink))" }}
                    >
                      <Brain className="h-4 w-4 text-white" />
                    </div>
                  )}
                  <div
                    className="max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed"
                    style={
                      msg.role === "user"
                        ? { background: "var(--grad)", color: "white", borderBottomRightRadius: 4 }
                        : { background: "var(--paper-2)", color: "var(--ink)", border: "1px solid var(--line)", borderBottomLeftRadius: 4 }
                    }
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {chatting && (
                <div className="flex items-end gap-2">
                  <div
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
                    style={{ background: "linear-gradient(135deg, var(--purple), var(--pink))" }}
                  >
                    <Brain className="h-4 w-4 text-white" />
                  </div>
                  <div
                    className="rounded-2xl px-4 py-3"
                    style={{ background: "var(--paper-2)", border: "1px solid var(--line)", borderBottomLeftRadius: 4 }}
                  >
                    <div className="flex items-center gap-1">
                      {[0, 0.15, 0.3].map((d, i) => (
                        <span
                          key={i}
                          className="h-2 w-2 rounded-full animate-bounce"
                          style={{ background: "var(--purple)", animationDelay: `${d}s` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatBottomRef} />
            </div>

            {/* Input bar */}
            <div
              className="flex gap-3 p-4"
              style={{ borderTop: "1px solid var(--line)" }}
            >
              <input
                value={chatMsg}
                onChange={(e) => setChatMsg(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendChat()}
                placeholder="Ask about ethical investing, Musharakah, due diligence…"
                className="flex-1 rounded-xl border px-4 py-2.5 text-sm outline-none transition-shadow focus:ring-2"
                style={INPUT_STYLE}
              />
              <button
                onClick={sendChat}
                disabled={chatting || !chatMsg.trim()}
                className="flex h-10 w-10 items-center justify-center rounded-xl text-white disabled:opacity-50 transition-opacity hover:opacity-90"
                style={{ background: "var(--grad)" }}
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
