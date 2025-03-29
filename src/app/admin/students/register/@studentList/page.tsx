import { StudentTable } from '@/components';

export default function StudentListSection() {
  return (
    <div>
      <div className="border-l-4 border-[#8BA0B1] pl-3 mb-4">
        <h2 className="text-xl font-semibold text-white">Enrolled Students</h2>
      </div>
      <StudentTable />
    </div>
  );
}
