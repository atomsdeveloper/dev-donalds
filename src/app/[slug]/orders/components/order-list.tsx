import { OrderStatus, Prisma } from "@prisma/client";

interface OrderListProps {
    orders: Array<
        Prisma.OrderGetPayload<{
            include: {
                restaurant: {
                    select: {
                        name: true,
                        avatarImageUrl: true
                    }
                }
                orderProducts: {
                    include: {
                        product: true,
                    }
                }
            }
        }>
    >;
}

const getStatusLabel = (status: OrderStatus) => {
    if(status === "FINISHED") return "Finalizado";
    if (status === "IN_PREPARATION") return "Em preparo";
    if(status === "PENDING") return "Pendente";
    
    return "";
}

const OrderList = ({orders}: OrderListProps) => {
    return ( 
        <div>

        </div>
    );
}
 
export default OrderList;