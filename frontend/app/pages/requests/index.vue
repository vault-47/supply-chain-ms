<script setup lang="ts">
import { QuoteRequestResponseDto } from "~/client/index";
import type {
  NavigationMenuItem,
  DropdownMenuItem,
  TableColumn,
} from "@nuxt/ui";
import { h, resolveComponent } from "vue";
const UBadge = resolveComponent("UBadge");
const { data: profile } = await useGetProfile();

const { data: quote_requests, isFetching } = await useGetQuoteRequests();

const columns: TableColumn<QuoteRequestResponseDto>[] = [
  {
    accessorKey: "qr_num",
    header: "ID",
  },
  // {
  //   accessorKey: "vendor_id",
  //   header: "Vendor",
  // },
  {
    accessorKey: "origin_address",
    header: "Origin",
  },
  {
    accessorKey: "destination_address",
    header: "Destination",
  },
  {
    accessorKey: "distance_km",
    header: "Distance",
    cell: ({ row }) => `${row.getValue("distance_km")}km`,
  },
  {
    accessorKey: "weight_kg",
    header: "Weight",
    cell: ({ row }) => `${row.getValue("weight_kg")}kg`,
  },
  {
    accessorKey: "urgency",
    header: "Urgency",
    cell: ({ row }) => {
      return h(
        UBadge,
        { class: "capitalize", variant: "soft", color: "neutral" },
        () => row.getValue("urgency"),
      );
    },
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const color = {
        pending: "PENDING" as const,
      }[row.getValue("status") as string];

      return h(UBadge, { class: "capitalize", variant: "subtle", color }, () =>
        row.getValue("status"),
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Date",
    cell: ({ row }) => {
      return new Date(row.getValue("created_at")).toLocaleString("en-US", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
    },
  },
];

console.log(profile.value?.role);
</script>

<template>
  <NuxtLayout name="dashboard-layout">
    <h1 class="text-xl font-semibold text-gray-600 mb-4">Requests</h1>
    <UTable
      :columns="columns"
      :loading="isFetching"
      loading-color="primary"
      loading-animation="carousel"
      :data="quote_requests"
      class="flex-1"
    />
  </NuxtLayout>
</template>
