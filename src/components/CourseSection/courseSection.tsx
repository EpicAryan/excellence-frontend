'use client'

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {TopicDialog} from '@/components';

interface Topic {
  id: number;
  name: string;
  pdfUrl: string;
}



const CourseSection: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const subjects = Object.keys(subjectTopicsMap);

  const handleOpenDialog = (subject: string) => {
    setSelectedSubject(subject);
  };

  const handleCloseDialog = () => {
    setSelectedSubject(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="bg-buttontag size-fit px-2 lg:px-4 py-2 text-xs lg:text-base lg:font-bold rounded-sm lg:rounded-md hover:bg-[#7A51C8] drop-shadow-[1px_1px_2px_rgba(163,163,163,1)] lg:drop-shadow-[2px_2px_3px_rgba(163,163,163,1)] mb-4">Class VII</h1>
      <div className="grid grid-cols-4 gap-4">
        {subjects.map((subject) => (
          <Button 
            key={subject} 
            variant="outline" 
            className="py-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out text-lg font-semibold bg-gradient-to-br from-purple-200 to-pink-100 hover:from-pink-300 hover:to-purple-300 text-gray-700 hover:text-gray-900 border-none"
            onClick={() => handleOpenDialog(subject)}
          >
            {subject}
          </Button>
        ))}
      </div>

      {selectedSubject && (
        <TopicDialog 
          topics={subjectTopicsMap[selectedSubject]} 
          selectedSubject={selectedSubject} 
          isOpen={!!selectedSubject}
          onOpenChange={(open) => {
            if (!open) {
              handleCloseDialog();
            }
          }}
        />
      )}
    </div>
  );
};

export default CourseSection;


// Define your subject and topic data
const subjectTopicsMap: Record<string, Topic[]> = {
  "Mathematics": [
    { id: 1, name: "Algebra", pdfUrl: "/pdfs/algebra.pdf" },
    { id: 2, name: "Geometry", pdfUrl: "/pdfs/geometry.pdf" },
    { id: 3, name: "Calculus", pdfUrl: "/pdfs/calculus.pdf" },
    { id: 4, name: "Trigonometry", pdfUrl: "/pdfs/trigonometry.pdf" },
    { id: 5, name: "Statistics", pdfUrl: "/pdfs/statistics.pdf" }
  ],
  "Physics": [
    { id: 6, name: "Mechanics", pdfUrl: "/pdfs/mechanics.pdf" },
    { id: 7, name: "Thermodynamics", pdfUrl: "/pdfs/thermodynamics.pdf" },
    { id: 8, name: "Electromagnetism", pdfUrl: "/pdfs/electromagnetism.pdf" },
    { id: 9, name: "Quantum Mechanics", pdfUrl: "/pdfs/quantum.pdf" },
    { id: 10, name: "Relativity", pdfUrl: "/pdfs/relativity.pdf" }
  ],
  "Chemistry": [
    { id: 11, name: "Organic Chemistry", pdfUrl: "/pdfs/organic.pdf" },
    { id: 12, name: "Inorganic Chemistry", pdfUrl: "/pdfs/inorganic.pdf" },
    { id: 13, name: "Physical Chemistry", pdfUrl: "/pdfs/physical.pdf" },
    { id: 14, name: "Analytical Chemistry", pdfUrl: "/pdfs/analytical.pdf" },
    { id: 15, name: "Biochemistry", pdfUrl: "/pdfs/biochemistry.pdf" }
  ],
  "Biology": [
    { id: 16, name: "Cell Biology", pdfUrl: "/pdfs/cell.pdf" },
    { id: 17, name: "Genetics", pdfUrl: "/pdfs/genetics.pdf" },
    { id: 18, name: "Ecology", pdfUrl: "/pdfs/ecology.pdf" },
    { id: 19, name: "Anatomy", pdfUrl: "/pdfs/anatomy.pdf" },
    { id: 20, name: "Physiology", pdfUrl: "/pdfs/physiology.pdf" }
  ],
  "Computer Science": [
    { id: 21, name: "Data Structures", pdfUrl: "/pdfs/data_structures.pdf" },
    { id: 22, name: "Algorithms", pdfUrl: "/pdfs/algorithms.pdf" },
    { id: 23, name: "Databases", pdfUrl: "/pdfs/databases.pdf" },
    { id: 24, name: "Operating Systems", pdfUrl: "/pdfs/os.pdf" },
    { id: 25, name: "Computer Networks", pdfUrl: "/pdfs/networks.pdf" }
  ],
  "History": [
    { id: 26, name: "World History", pdfUrl: "/pdfs/world_history.pdf" },
    { id: 27, name: "American History", pdfUrl: "/pdfs/american_history.pdf" },
    { id: 28, name: "European History", pdfUrl: "/pdfs/european_history.pdf" },
    { id: 29, name: "Ancient History", pdfUrl: "/pdfs/ancient_history.pdf" },
    { id: 30, name: "Modern History", pdfUrl: "/pdfs/modern_history.pdf" }
  ],
  "English Literature": [
    { id: 31, name: "Shakespeare", pdfUrl: "/pdfs/shakespeare.pdf" },
    { id: 32, name: "Poetry", pdfUrl: "/pdfs/poetry.pdf" },
    { id: 33, name: "Drama", pdfUrl: "/pdfs/drama.pdf" },
    { id: 34, name: "Novels", pdfUrl: "/pdfs/novels.pdf" },
    { id: 35, name: "Literary Theory", pdfUrl: "/pdfs/literary_theory.pdf" }
  ],
  "Economics": [
    { id: 36, name: "Microeconomics", pdfUrl: "/pdfs/microeconomics.pdf" },
    { id: 37, name: "Macroeconomics", pdfUrl: "/pdfs/macroeconomics.pdf" },
    { id: 38, name: "Econometrics", pdfUrl: "/pdfs/econometrics.pdf" },
    { id: 39, name: "International Economics", pdfUrl: "/pdfs/international.pdf" },
    { id: 40, name: "Development Economics", pdfUrl: "/pdfs/development.pdf" }
  ],
  "Psychology": [
    { id: 41, name: "Developmental Psychology", pdfUrl: "/pdfs/developmental_psych.pdf" },
    { id: 42, name: "Social Psychology", pdfUrl: "/pdfs/social_psych.pdf" },
    { id: 43, name: "Cognitive Psychology", pdfUrl: "/pdfs/cognitive_psych.pdf" },
    { id: 44, name: "Abnormal Psychology", pdfUrl: "/pdfs/abnormal_psych.pdf" },
    { id: 45, name: "Clinical Psychology", pdfUrl: "/pdfs/clinical_psych.pdf" }
  ],
  "Geography": [
    { id: 46, name: "Physical Geography", pdfUrl: "/pdfs/physical_geography.pdf" },
    { id: 47, name: "Human Geography", pdfUrl: "/pdfs/human_geography.pdf" },
    { id: 48, name: "Economic Geography", pdfUrl: "/pdfs/economic_geography.pdf" },
    { id: 49, name: "Political Geography", pdfUrl: "/pdfs/political_geography.pdf" },
    { id: 50, name: "Environmental Geography", pdfUrl: "/pdfs/environmental_geography.pdf" }
  ],
  "Political Science": [
    { id: 51, name: "Political Theory", pdfUrl: "/pdfs/political_theory.pdf" },
    { id: 52, name: "Comparative Politics", pdfUrl: "/pdfs/comparative_politics.pdf" },
    { id: 53, name: "International Relations", pdfUrl: "/pdfs/international_relations.pdf" },
    { id: 54, name: "Public Administration", pdfUrl: "/pdfs/public_administration.pdf" },
    { id: 55, name: "Public Policy", pdfUrl: "/pdfs/public_policy.pdf" }
  ],
  "Sociology": [
    { id: 56, name: "Social Theory", pdfUrl: "/pdfs/social_theory.pdf" },
    { id: 57, name: "Research Methods", pdfUrl: "/pdfs/research_methods.pdf" },
    { id: 58, name: "Deviance", pdfUrl: "/pdfs/deviance.pdf" },
    { id: 59, name: "Social Stratification", pdfUrl: "/pdfs/social_stratification.pdf" },
    { id: 60, name: "Family Sociology", pdfUrl: "/pdfs/family_sociology.pdf" }
  ]
};
