import { useEffect, useState } from 'react';
// import Header from '../components/Header';
// import LaunchItem from '../components/LauchItem'

import { Plus } from "lucide-react";
import { ListLaunchHistory } from "./activities";
import { DestinationAndDateHeader } from "../../components/destination-and-date-header";
import { apiService } from "../../lib/axios";


export function History() {


  return (
    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
      <DestinationAndDateHeader />

      <main className="flex gap-16 px-4">
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold">Histórico de Lançamentos</h2>
          </div>

          <ListLaunchHistory />
        </div>

      </main>
    </div>
  )
}