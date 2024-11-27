import { Activities } from "./company/activities";
import { VisitorHeader } from "@/components/visitor-header";




export default function VisitorDashboard(){
    return(

        <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
        <VisitorHeader />

        <main className="flex gap-16 px-4">
            <div className="flex-1 space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-semibold">Lançamentos</h2>
                </div>
                <Activities />
            </div>
        </main>
    </div>
    )

}