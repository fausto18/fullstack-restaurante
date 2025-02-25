import { db } from "@/lib/prisma";

import { isValidNifAngola, removeNifPunctuation } from "../menu/helpers/nif";
import NifForm from "./components/nif-form";
import OrderList from "./components/order-list";

interface OrdersPageProps {
  searchParams: Promise<{ nif: string }>;
}

const OrdersPage = async ({ searchParams }: OrdersPageProps) => {
  const { nif } = await searchParams;
  if (!nif) {
    return <NifForm />;
  }
  if (!isValidNifAngola(nif)) {
    return <NifForm />;
  }
  const orders = await db.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      customerNif: removeNifPunctuation(nif),
    },
    include: {
      restaurant: {
        select: {
          name: true,
          avatarImageUrl: true,
        },
      },
      orderProducts: {
        include: {
          product: true,
        },
      },
    },
  });
  return <OrderList orders={orders} />;
};

export default OrdersPage;
