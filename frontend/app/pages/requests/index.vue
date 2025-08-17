<script setup lang="ts">
import type {
  NavigationMenuItem,
  DropdownMenuItem,
  TableColumn,
} from "@nuxt/ui";
import { h, resolveComponent } from "vue";

const UBadge = resolveComponent("UBadge");
const UAvatar = resolveComponent("UAvatar");
const UButton = resolveComponent("UButton");

const { data: profile } = await useGetProfile();

const route = useRoute();
const router = useRouter();
const page = ref(route.query.page ? Number(route.query.page) : 1);
const { meta } = usePageMetaStore();

const { data: quote_requests, isFetching } = await useGetQuoteRequests();

const table = useTemplateRef("table");
const expanded = ref({ 1: true });
const columnVisibility = computed(() => ({
  vendor: profile.value?.role === "SHIPPER",
  user: profile.value?.role === "VENDOR",
}));

const columns: TableColumn<QuoteRequestResponseDto>[] = [
  {
    id: "expand",
    cell: ({ row }) =>
      h(UButton, {
        color: "neutral",
        variant: "ghost",
        icon: "i-lucide-chevron-down",
        square: true,
        "aria-label": "Expand",
        ui: {
          leadingIcon: [
            "transition-transform",
            row.getIsExpanded() ? "duration-200 rotate-180" : "",
          ],
        },
        onClick: () => row.toggleExpanded(),
      }),
  },
  {
    accessorKey: "qr_num",
    header: "ID",
  },
  {
    accessorKey: "user",
    header: "Customer",
    cell: ({ row }) => {
      return h("span", { class: "" }, row.getValue("user").business_name);
    },
  },
  {
    accessorKey: "vendor",
    header: "Vendor",
    cell: ({ row }) => {
      return h("span", { class: "" }, row.getValue("vendor").business_name);
    },
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
</script>

<template>
  <NuxtLayout name="dashboard-layout">
    <template #page-title> Requests </template>
    <UTable
      ref="table"
      v-model:expanded="expanded"
      :ui="{ tr: 'data-[expanded=true]:bg-elevated/50' }"
      v-model:column-visibility="columnVisibility"
      :columns="columns"
      :loading="isFetching"
      loading-color="primary"
      loading-animation="swing"
      :data="quote_requests"
    >
      <template #expanded="{ row }">
        <div class="grid grid-cols-4 gap-10">
          <LabelValue label="Origin">
            <template #value>{{ row.original?.origin_address }}</template>
          </LabelValue>
          <LabelValue label="Destination">
            <template #value>{{ row.original?.destination_address }}</template>
          </LabelValue>
          <LabelValue label="Additional note">
            <template #value>{{
              row.original?.additional_note || "-"
            }}</template>
          </LabelValue>
        </div>
        <USeparator v-if="profile.role === 'VENDOR'" class="my-3" />
        <UButton
          v-if="profile.role === 'VENDOR'"
          variant="outline"
          icon="i-lucide-message-square-quote"
          >Respond to request</UButton
        >
      </template>
    </UTable>
    <div class="mt-5 flex justify-center">
      <UPagination
        :max="2"
        v-if="!isFetching"
        size="sm"
        v-model="page"
        :page-count="Number(meta?.totalPages)"
        :total="Number(meta?.totalItems)"
      />
    </div>
  </NuxtLayout>
</template>
