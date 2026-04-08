"use client";
import { useState } from "react";
import StepsTimeline from "@/components/SignUpPage/StepsTimeline";
import AccountFormStep from "@/components/SignUpPage/AccountFormStep";
import ProfessionFormStep from "@/components/SignUpPage/ProfessionFormStep";
import InterestsFormStep from "@/components/SignUpPage/InterestsFormStep";
import PremiumPlansFormStep from "@/components/SignUpPage/PremiumPlansFormStep";
import FinishFormStep from "@/components/SignUpPage/FinishFormStep";


function SignUpPage() {
    const [currentStep, setCurrentStep] = useState(1);
    const [userData, setUserData] = useState({
        email: "",
        password: "",
        username: "",
        displayName: "",
        role: "",
        bio: "",
        planId: "",
        avatarUrl: "",
        bannerUrl: "",
        genres: [],
        skills: []
    });
    const changeCurrentStep = (step: number) => {
        setCurrentStep(step);
    };

    const updateUserData = (data: Partial<typeof userData>) => {
        setUserData((prev) => ({ ...prev, ...data }));
    };

    return (
        <div className="w-full max-w-5xl md:max-w-7xl mx-auto px-6 mt-8">
            <div className="flex flex-col justify-evenly items-center">
                <div className="flex flex-col items-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-[1.1]">
                        Sign Up to <span className="bg-linear-to-r from-primary to-accent bg-clip-text text-transparent italic">ZYR♪Q</span>
                    </h2>
                    <div className="w-20 h-1 mt-2 bg-primary rounded-full"></div>
                </div>
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-80 h-80 bg-[#8b5cf6] rounded-full opacity-20 blur-[100px] pointer-events-none" />
                <StepsTimeline step={currentStep} />
                {currentStep === 1 && <AccountFormStep changeCurrentStep={changeCurrentStep} userData={userData} updateUserData={updateUserData} />}
                {currentStep === 2 && <ProfessionFormStep changeCurrentStep={changeCurrentStep} userData={userData} updateUserData={updateUserData} />}
                {currentStep === 3 && <InterestsFormStep changeCurrentStep={changeCurrentStep} userData={userData} updateUserData={updateUserData} />}
                {currentStep === 4 && <PremiumPlansFormStep changeCurrentStep={changeCurrentStep} userData={userData} updateUserData={updateUserData} />}
                {currentStep === 5 && <FinishFormStep changeCurrentStep={changeCurrentStep} userData={userData} updateUserData={updateUserData} />}
            </div>
        </div>
    );
}

export default SignUpPage;