"use client";

import React, { useEffect, useState } from "react";

type Props = {
  targetPFC: {
    protein: number;
    fat: number;
    carbs: number;
    calories: number;
  };
};

// 🔽 これをファイル上部、コンポーネントの外に追加してOK
const tips = [
  "卵1個には約6gのタンパク質が含まれています。",
  "ごはん150gには約55gの炭水化物が含まれています。",
  "鶏胸肉100gには約22gのタンパク質があります。",
  "豆腐150gには約10gのタンパク質が含まれます。",
  "脂質は1gで9kcal、タンパク質と炭水化物は1gで4kcalです。",
  "粉プロテイン1杯(30g)は約20gのタンパク質を含みます。",
  "野菜もしっかり取りましょう！ビタミンと食物繊維が豊富です。",
];

const randomTip = () => {
  const index = Math.floor(Math.random() * tips.length);
  return tips[index];
};


export default function ProteinMealPlanner({ targetPFC }: Props) {
  const [freeText, setFreeText] = useState(""); // ← 自然文で受け取る用
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMealData = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/generate-meal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(targetPFC),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const text = await res.text();
      console.log("GPTからの献立テキスト", text);
      setFreeText(text);
    } catch (err) {
      console.error("献立取得エラー:", err);
      setError("献立の取得に失敗しました。");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (targetPFC.protein > 0 && targetPFC.fat > 0 && targetPFC.carbs > 0) {
      fetchMealData();
    }
  }, [targetPFC]);

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl p-4 shadow">
      <h2 className="text-2xl font-bold mb-4">🍽️ AI提案の食事メニュー</h2>

      <button
        onClick={fetchMealData}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        disabled={loading}
      >
        {loading ? "⏳ 生成中..." : "🔄 献立を再生成する"}
      </button>

      {loading && (
  <div className="space-y-4 text-sm text-gray-700">
    <p>⏳ 献立を生成中です（10〜15秒ほどかかる場合があります）...</p>

    {/* スケルトンUI */}
    <div className="animate-pulse space-y-2">
      <div className="bg-gray-200 h-6 rounded w-1/2" />
      <div className="bg-gray-100 h-4 rounded w-4/5" />
      <div className="bg-gray-100 h-4 rounded w-3/4" />
      <div className="bg-gray-100 h-4 rounded w-2/3" />
    </div>

    {/* 豆知識 */}
      <p className="mt-4 px-3 py-2 bg-yellow-50 border-l-4 border-yellow-400 text-base text-yellow-800 rounded shadow-sm">
        💡 {randomTip()}
      </p>

  </div>
)}

      {error && <p className="text-red-600">{error}</p>}

      {freeText && (
        <pre className="whitespace-pre-wrap bg-gray-50 p-4 rounded border text-sm leading-relaxed">
          {freeText}
        </pre>
      )}
    </div>
  );
}
