import { RequestStatus } from '@/dto/RequestState';
import { Order, Orders } from '@/dto/OrderResponse';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { OrdersTableStyle } from '@/style/OrdersStyle';

const orderRow = (order: Order) => {
    return <TableRow
            key={order.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell>
                {order.id}
            </TableCell>
            <TableCell>
                {order.customerUsername}
            </TableCell>
            <TableCell>
                {order.timestamp.slice(0, 16)}
            </TableCell>
            <TableCell>
                {order.status}
            </TableCell>
            <TableCell>
                {order.pickUpPointAddress}
            </TableCell>
            <TableCell>
                {order.cost}
            </TableCell>
        </TableRow>
}

const orderTableHead = () => {
    return <TableHead>
                <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell>заказчик</TableCell>
                    <TableCell>дата</TableCell>
                    <TableCell>статус</TableCell>
                    <TableCell>ПВЗ</TableCell>
                    <TableCell>стоимость</TableCell>
                </TableRow>
            </TableHead>
}

const OrdersPageMainView = (props: {
    status: RequestStatus,
    orders: Orders | undefined,
    selectedOrder: Order | null,
}) => {
    console.log("Render OrdersPageMainView")

    if (props.status === RequestStatus.Idle || props.status === RequestStatus.Loading) {
        return <div>Загрузка...</div>;
    }

    if (props.status === RequestStatus.Error) {
        return <div>Ошибка загрузки данных</div>
    }

    if (!props.selectedOrder && !props.orders?.content) {
        return <div>У вас ещё нет заказов</div>
    }

    if (props.selectedOrder) {
        return <TableContainer component={Paper}>
                <Table sx={OrdersTableStyle} aria-label="simple table">
                    {orderTableHead()}
                    <TableBody>
                    {orderRow(props.selectedOrder)}
                    </TableBody>
                </Table>
            </TableContainer>
    }

    return (
        <TableContainer component={Paper}>
                <Table sx={OrdersTableStyle} aria-label="simple table">
                    {orderTableHead()}
                    <TableBody>
                    {props.orders?.content?.map((order) => (
                        orderRow(order)
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
    )
}

export default OrdersPageMainView;
