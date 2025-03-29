export default function StudentRegistrationLayout({
    children, // Default page content (can be minimal or empty)
    registration, // RegisterForm + SearchSection
    studentList, // StudentTable
  }: {
    children: React.ReactNode;
    registration: React.ReactNode;
    studentList: React.ReactNode;
  }) {
    return (
      <div className="min-h-screen bg-[#1E1E1E] text-white">
        <div className="container mx-auto py-12 px-4">
          <h1 className="text-3xl font-bold text-white mb-6">Student Registration</h1>
          {children}
          <div className="space-y-16">
            {/* Registration section */}
            <section>
              {registration}
            </section>
            
            {/* Student List section */}
            <section>
              {studentList}
            </section>
          </div>
        </div>
      </div>
    );
  }
