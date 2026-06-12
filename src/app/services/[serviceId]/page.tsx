"use client";

import { useEffect, useState } from "react";
import { use } from "react";
import Link from "next/link";
import { apiGet } from "@/lib/apiClient";

type Service = { serviceId: string; priceStroops: number };
type Rollup = { serviceId: string; total: number; agents: number };

export default function ServiceDetailPage({
  params,
}: {
  params: Promise<{ serviceId: string }>;
}) {
  const { serviceId } = use(params);
  const [service, setService] = useState<Service | null>(null);
  const [rollup, setRollup] = useState<Rollup | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiGet<Service>(`/api/v1/services/${encodeURIComponent(serviceId)}`)
      .then(setService)
      .catch((e) => setError(e.message));
    apiGet<Rollup>(`/api/v1/services/${encodeURIComponent(serviceId)}/usage`)
      .then(setRollup)
      .catch(() => {
        /* rollup is optional */
      });
  }, [serviceId]);

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="mx-auto flex min-h-[60vh] max-w-3xl flex-col gap-6 p-8 focus:outline-none"
    >
      <Link href="/services" className="text-sm text-zinc-500 hover:underline">
        ← Back to services
      </Link>
      <h1 className="text-3xl font-semibold tracking-tight font-mono">{serviceId}</h1>
      {error && (
        <p role="alert" className="text-sm text-rose-600">
          {error}
        </p>
      )}
      {service && (
        <dl className="grid grid-cols-2 gap-4">
          <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
            <dt className="text-xs uppercase text-zinc-500">Price</dt>
            <dd className="mt-1 text-2xl font-semibold">
              {service.priceStroops} stroops
            </dd>
          </div>
          {rollup && (
            <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
              <dt className="text-xs uppercase text-zinc-500">Requests / agents</dt>
              <dd className="mt-1 text-2xl font-semibold">
                {rollup.total} / {rollup.agents}
              </dd>
            </div>
          )}
        </dl>
      )}
      <div className="flex gap-3">
        <Link
          href={`/services/${encodeURIComponent(serviceId)}/edit`}
          className="rounded-full border border-zinc-300 px-4 py-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:border-zinc-700"
        >
          Edit price
        </Link>
        <Link
          href={`/services/${encodeURIComponent(serviceId)}/agents`}
          className="rounded-full border border-zinc-300 px-4 py-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:border-zinc-700"
        >
          Top agents
        </Link>
      </div>
    </main>
  );
}
