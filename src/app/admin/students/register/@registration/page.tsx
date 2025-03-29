import { RegisterForm } from '@/components';
import { SearchSection } from '@/components';

export default function RegistrationSection() {
  return (
    <div className="space-y-6">
      <div className="border-l-4 border-[#8D6CCB] pl-3 mb-4">
        <h2 className="text-xl font-semibold text-white">Registration</h2>
      </div>
      <RegisterForm />
      <SearchSection />
    </div>
  );
}
