"use client";

import React, { useState } from "react";

type Props = {
  onCalculated: (pfc: {
    protein: number;
    fat: number;
    carbs: number;
    calories: number;
  }) => void;
};

export default function ProteinCalculatorForm({ onCalculated }: Props) {
  const [gender, setGender] = useState("male");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [activityLevel, setActivityLevel] = useState("1.55");
  const [goal, setGoal] = useState<"cut" | "maintain" | "bulk" | "beauty">("maintain");
  const [type, setType] = useState("strength");
  const [isTrainingDay, setIsTrainingDay] = useState("yes");

  const [showExplanation, setShowExplanation] = useState(false);


  const [result, setResult] = useState<{
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
  } | null>(null);

const calculatePFC = () => {
  console.log("計算開始");

  const weightNum = parseFloat(weight);
  const heightNum = parseFloat(height);
  const ageNum = parseFloat(age);
  const activity = parseFloat(activityLevel);

if (
  isNaN(weightNum) ||
  isNaN(heightNum) ||
  isNaN(ageNum) ||
  weightNum < 30 || weightNum > 200 ||
  heightNum < 100 || heightNum > 250 ||
  ageNum < 10 || ageNum > 100
) {
  alert("身長は100〜250cm、体重は30〜200kg、年齢は10〜100歳の範囲で入力してください");
  return;
}


  // BMR計算
  let bmr = 0;
  if (gender === "male") {
    bmr = 66.47 + 13.75 * weightNum + 5.003 * heightNum - 6.755 * ageNum;
  } else {
    bmr = 655.1 + 9.563 * weightNum + 1.85 * heightNum - 4.676 * ageNum;
  }

  // TDEE計算
  let tdee = bmr * activity;
  if (goal === "cut") tdee -= 400;
  if (goal === "bulk") tdee += 400;

// タンパク質を体重ベースで計算（より現実的）
let proteinPerKg = 1.2; // デフォルト

if (goal === "beauty") {
  proteinPerKg = 1.0;
} else if (goal === "cut") {
  if (type === "strength") {
    proteinPerKg = 2.4;
  } else if (type === "cardio") {
    proteinPerKg = 2.2;
  } else {
    proteinPerKg = 1.8;
  }
} else if (goal === "bulk") {
  if (type === "strength") {
    proteinPerKg = 2.1;
  } else if (type === "cardio") {
    proteinPerKg = 2.0;
  } else {
    proteinPerKg = 1.7;
  }
} else if (goal === "maintain") {
  if (type === "strength") {
    proteinPerKg = 1.6;
  } else if (type === "cardio") {
    proteinPerKg = 1.4;
  } else {
    proteinPerKg = 1.2;
  }
}

// 脂質の比率設定
let fRatio = 0.25;

if (goal === "beauty") {
  fRatio = 0.20;
}

// トレーニング日なら脂質をやや抑える
if (isTrainingDay === "yes" && (goal === "cut" || goal === "bulk")) {
  fRatio -= 0.03; // 少し控えめ（5% → 3% に調整）
}

// PFC計算
const protein = Math.round(weightNum * proteinPerKg);
const proteinCalories = protein * 4;

const fat = Math.round((tdee * fRatio) / 9);
const fatCalories = fat * 9;

const remainingCalories = tdee - proteinCalories - fatCalories;
const carbs = Math.round(remainingCalories / 4);


  const calculatedResult = {
    calories: Math.round(tdee),
    protein,
    fat,
    carbs,
  };

  console.log("計算結果:", calculatedResult);
  setResult(calculatedResult);
  onCalculated({ protein, fat, carbs, calories: Math.round(tdee) });
};




  return (
    <div className="max-w-xl mx-auto bg-white rounded-xl p-4 shadow mb-6">
      <h2 className="text-xl font-bold mb-4">🎯 PFCバランス＋カロリー計算フォーム</h2>

      <div className="mb-3">
        <label className="block font-medium">性別:</label>
        <select value={gender} onChange={(e) => setGender(e.target.value)} className="border rounded p-2 w-full">
          <option value="male">男性</option>
          <option value="female">女性</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="block font-medium">年齢:</label>
        <input 
          type="number" 
          value={age} 
          onChange={(e) => setAge(e.target.value)} 
          className="border rounded p-2 w-full"
          placeholder="例: 25"
        />
      </div>

      <div className="mb-3">
        <label className="block font-medium">身長（cm）:</label>
        <input 
          type="number" 
          value={height} 
          onChange={(e) => setHeight(e.target.value)} 
          className="border rounded p-2 w-full"
          placeholder="例: 170"
        />
      </div>

      <div className="mb-3">
        <label className="block font-medium">体重（kg）:</label>
        <input 
          type="number" 
          value={weight} 
          onChange={(e) => setWeight(e.target.value)} 
          className="border rounded p-2 w-full"
          placeholder="例: 70"
        />
      </div>

      <div className="mb-3">
        <label className="block font-medium">活動レベル:</label>
        <select value={activityLevel} onChange={(e) => setActivityLevel(e.target.value)} className="border rounded p-2 w-full">
          <option value="1.2">低い（デスク中心）</option>
          <option value="1.375">やや低い（週1〜2）</option>
          <option value="1.55">普通（週3〜4）</option>
          <option value="1.75">高め（週5〜6）</option>
          <option value="1.9">非常に高い（毎日・ハード）</option>
        </select>
      </div>

<div className="mb-3">
  <label className="block font-medium">目標:</label>
  <select value={goal} onChange={(e) => setGoal(e.target.value as "cut" | "maintain" | "bulk" | "beauty")} className="border rounded p-2 w-full">
    <option value="cut">減量</option>
    <option value="maintain">維持</option>
    <option value="bulk">筋肥大</option>
    <option value="beauty">美容・健康</option> {/* ← 追加 */}
  </select>
</div>

<div className="mb-3">
  <label className="block font-medium">本日はトレーニング日ですか？</label>
  <select
    value={isTrainingDay}
    onChange={(e) => setIsTrainingDay(e.target.value)}
    className="border rounded p-2 w-full bg-white disabled:bg-gray-100 disabled:text-gray-400"
    disabled={goal === "maintain" || goal === "beauty"}
  >
    <option value="yes">はい（トレーニング日）</option>
    <option value="no">いいえ（休養日）</option>
  </select>
  {(goal === "maintain" || goal === "beauty") && (
    <p className="text-sm text-gray-500 mt-1">※この目標ではトレーニング日は考慮されません</p>
  )}
</div>

<div className="mb-3">
  <label className="block font-medium">トレーニングの種類:</label>
  <select
    value={type}
    onChange={(e) => setType(e.target.value)}
    className="border rounded p-2 w-full bg-white disabled:bg-gray-100 disabled:text-gray-400"
    disabled={goal === "maintain" || goal === "beauty" || isTrainingDay === "no"}
  >
    <option value="cardio">有酸素運動</option>
    <option value="strength">筋トレ</option>
  </select>
  {(goal === "maintain" || goal === "beauty") && (
    <p className="text-sm text-gray-500 mt-1">※この目標ではトレーニング種別は考慮されません</p>
  )}
</div>


      {/* <div className="mb-3"> */}
        {/* <label className="block font-medium">プロテイン1杯あたりのタンパク質量（g）:</label> */}
        {/* <input  */}
          {/* type="number"  */}
          {/* value={proteinPerScoop}  */}
          {/* onChange={(e) => setProteinPerScoop(e.target.value)}  */}
          {/* className="border rounded p-2 w-full" */}
          {/* placeholder="例: 20" */}
        {/* /> */}
        {/* <p className="text-sm text-gray-500 mt-1">一般的なホエイプロテインは約20gです</p> */}
      {/* </div> */}

      <button 
        onClick={calculatePFC} 
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
      >
        目標カロリー＆PFCを計算し，献立を提案する
      </button>

      {result && (
        <div className="mt-4 text-lg font-semibold space-y-2">
          <p>🔥 カロリー: <span className="text-red-600">{result.calories} kcal</span></p>
          <p>💪 タンパク質: <span className="text-blue-600">{result.protein}g</span></p>
          <p>🔥 脂質: <span className="text-red-600">{result.fat}g</span></p>
          <p>⚡ 炭水化物: <span className="text-yellow-600">{result.carbs}g</span></p>
        </div>
      )}

      <div className="mt-4">
  <button
    onClick={() => setShowExplanation(!showExplanation)}
    className="text-blue-600 underline focus:outline-none"
  >
    計算の根拠を表示 {showExplanation ? "▲" : "▼"}
  </button>

{showExplanation && (
  <div className="mt-2 p-3 border border-gray-300 rounded bg-gray-50 text-sm text-gray-700 space-y-2">
    <p>🔹 <strong>PFC計算方法について</strong></p>

    <ul className="list-disc pl-6 space-y-1">
      <li><strong>基礎代謝（BMR）</strong>: Mifflin-St Jeor式を使用</li>
      <li><strong>総消費カロリー（TDEE）</strong>: BMR × 活動レベル（1.2〜1.9）</li>
      <li><strong>目標補正</strong>: 減量なら−400kcal、筋肥大なら+400kcal</li>
      <li><strong>タンパク質</strong>: 体重 × タンパク質係数（下記）</li>
      <li><strong>脂質</strong>: TDEEの{goal === "beauty" ? "20%" : "25%"}（トレ日は −3%）</li>
      <li><strong>炭水化物</strong>: 残りのカロリーから逆算</li>
    </ul>

    <p>🔹 <strong>タンパク質係数（g/kg 体重）</strong>:</p>
    <ul className="list-disc pl-6 space-y-1">
      <li><strong>美容・健康</strong>: 1.0</li>
      <li><strong>維持 × 筋トレ</strong>: 1.6</li>
      <li><strong>維持 × 有酸素</strong>: 1.4</li>
      <li><strong>減量 × 筋トレ</strong>: 2.4</li>
      <li><strong>減量 × 有酸素</strong>: 2.2</li>
      <li><strong>筋肥大 × 筋トレ</strong>: 2.1</li>
      <li><strong>筋肥大 × 有酸素</strong>: 2.0</li>
    </ul>

    <p>🔹 <strong>その他</strong>:</p>
    <ul className="list-disc pl-6 space-y-1">
      <li>タンパク質・炭水化物は1gあたり4kcal、脂質は1gあたり9kcalとして計算</li>
      <li>トレーニング日は脂質を少し抑え、その分を炭水化物に配分します</li>
    </ul>
  </div>
)}


</div>

    </div>
  );
  
}