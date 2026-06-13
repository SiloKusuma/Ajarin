'use client';

import { useState } from 'react';
import SubjectSelection from '../components/SubjectSelection';
import GradeSelection from '../components/GradeSelection';
import MaterialSelection from '../components/MaterialSelection';
import InterestSelection from '../components/InterestSelection';
import LearningInterface from '../components/LearningInterface';

type Step = 'subject' | 'grade' | 'material' | 'interests' | 'learning';

interface UserProfile {
  subject: string;
  grade: string;
  material: string;
  interests: {
    hobby: string;
    favoriteFood: string;
    favoriteDrink: string;
    favoriteItem: string;
  };
}

export default function LearnPage() {
  const [currentStep, setCurrentStep] = useState<Step>('subject');
  const [userProfile, setUserProfile] = useState<UserProfile>({
    subject: '',
    grade: '',
    material: '',
    interests: {
      hobby: '',
      favoriteFood: '',
      favoriteDrink: '',
      favoriteItem: '',
    },
  });

  const handleSubjectSelect = (subject: string) => {
    setUserProfile({ ...userProfile, subject });
    setCurrentStep('grade');
  };

  const handleGradeSelect = (grade: string) => {
    setUserProfile({ ...userProfile, grade });
    setCurrentStep('material');
  };

  const handleMaterialSelect = (material: string) => {
    setUserProfile({ ...userProfile, material });
    setCurrentStep('interests');
  };

  const handleInterestsSelect = (interests: UserProfile['interests']) => {
    setUserProfile({ ...userProfile, interests });
    setCurrentStep('learning');
  };

  const handleBack = () => {
    if (currentStep === 'grade') setCurrentStep('subject');
    if (currentStep === 'material') setCurrentStep('grade');
    if (currentStep === 'interests') setCurrentStep('material');
  };

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="container mx-auto px-6">
        {/* Progress Bar */}
        {currentStep !== 'learning' && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              {['subject', 'grade', 'material', 'interests'].map((step, idx) => (
                <div key={step} className="flex items-center flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                    currentStep === step ? 'bg-amber-600 scale-110' : 
                    ['subject', 'grade', 'material', 'interests'].indexOf(currentStep) > idx ? 'bg-green-500' : 'bg-gray-300'
                  }`}>
                    {idx + 1}
                  </div>
                  {idx < 3 && (
                    <div className={`h-1 flex-1 mx-2 ${
                      ['subject', 'grade', 'material', 'interests'].indexOf(currentStep) > idx ? 'bg-green-500' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Content */}
        {currentStep === 'subject' && (
          <SubjectSelection onSelect={handleSubjectSelect} />
        )}
        {currentStep === 'grade' && (
          <GradeSelection onSelect={handleGradeSelect} onBack={handleBack} />
        )}
        {currentStep === 'material' && (
          <MaterialSelection 
            subject={userProfile.subject} 
            grade={userProfile.grade}
            onSelect={handleMaterialSelect}
            onBack={handleBack}
          />
        )}
        {currentStep === 'interests' && (
          <InterestSelection 
            onSelect={handleInterestsSelect}
            onBack={handleBack}
          />
        )}
        {currentStep === 'learning' && (
          <LearningInterface userProfile={userProfile} />
        )}
      </div>
    </div>
  );
}
