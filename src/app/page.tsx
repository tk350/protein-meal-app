// src/app/page.tsx
"use client";

import { useState } from "react";
import Head from "next/head";
import ProteinCalculatorForm from "@/components/ProteinCalculatorForm";
import ProteinMealPlanner from "@/components/ProteinMealPlanner";

export default function Home() {
  const [targetPFC, setTargetPFC] = useState<{
    protein: number;
    fat: number;
    carbs: number;
    calories: number;
  } | null>(null);

  return (
    <>
      <Head>
        <title>【無料】PFC・タンパク質・カロリー計算ツール｜筋トレ・美容・ダイエットに</title>
        <meta
          name="description"
          content="目的に合わせてタンパク質・脂質・炭水化物（PFC）とカロリーを自動計算。筋トレ、美容、ダイエットに最適。プロテイン量や摂取の目安もわかります。"
        />
        <meta
          name="keywords"
          content="タンパク質 計算, PFCバランス, カロリー計算, 栄養管理, 筋トレ, 美容, ダイエット, 献立提案, プロテイン"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="p-4">
        <h1 className="text-2xl font-bold mb-4">
          タンパク質・カロリー・PFCバランス計算ツール
        </h1>
        <p className="text-sm text-gray-700 mb-6">
          年齢・性別・体重・身長を入力するだけで，あなたに必要なタンパク質量とカロリーやPFCバランスを自動で計算します。
          AIが食事メニュー，献立を提案し，筋トレ・美容・ダイエットなど目的に応じた栄養管理をサポートします。
        </p>

        <ProteinCalculatorForm
          onCalculated={(pfc) => {
            setTargetPFC(pfc);
          }}
        />

        {targetPFC && <ProteinMealPlanner targetPFC={targetPFC} />}
      </main>
    </>
  );
}
