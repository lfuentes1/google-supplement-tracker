
import Supplements from "@/components/Supplements";
import IntakeTracker from "@/components/IntakeTracker";
import Insights from "@/components/Insights";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-800">IntelliDose</h1>
      </header>
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Supplements />
          <IntakeTracker />
          <Insights />
        </div>
      </main>
    </div>
  );
};

export default Index;
