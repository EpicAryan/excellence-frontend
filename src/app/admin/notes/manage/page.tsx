export default function NotesManagePage() {
  return (
    <div className="mt-8 p-6 bg-[#1E1E1E] border border-[#8D6CCB]/20 rounded-lg text-white">
      <h2 className="text-xl font-semibold mb-4">Notes Management Dashboard</h2>
      <p>Use the panels below to manage your educational content hierarchy and uploaded materials.</p>
      <ul className="list-disc list-inside mt-4 space-y-2 text-gray-300">
        <li>Top panel: Manage boards, classes, and subjects</li>
        <li>Bottom panel: Manage uploaded topics and their PDF files</li>
      </ul>
    </div>
  );
}
