import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Layout } from "./Layout";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Calendar, FileText, Send, Clock, Wallet, CreditCard, AlertCircle } from "lucide-react";

const chartData = [
  { day: 'Mon', vouchers: 12 },
  { day: 'Tue', vouchers: 19 },
  { day: 'Wed', vouchers: 8 },
  { day: 'Thu', vouchers: 25 },
  { day: 'Fri', vouchers: 31 },
  { day: 'Sat', vouchers: 15 },
  { day: 'Sun', vouchers: 7 },
];

const recentVouchers = [
  { type: "Sales", voucher: "INV-001", customer: "John Doe", amount: "₹5,000", status: "Sent", time: "2 min ago" },
  { type: "Payment", voucher: "PAY-123", customer: "Jane Smith", amount: "₹2,500", status: "Delivered", time: "5 min ago" },
  { type: "Purchase", voucher: "PUR-456", customer: "ABC Corp", amount: "₹15,000", status: "Sent", time: "12 min ago" },
  { type: "Sales", voucher: "INV-002", customer: "Mike Johnson", amount: "₹8,500", status: "Failed", time: "18 min ago" },
  { type: "Receipt", voucher: "REC-789", customer: "Sarah Wilson", amount: "₹3,200", status: "Delivered", time: "25 min ago" },
];

export function Dashboard() {
  const currentBalance = 3.50; // Current account balance in INR
  const isLowBalance = currentBalance < 10;

  return (
    <Layout currentPage="Dashboard">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl text-gray-900">Dashboard</h1>
          <div className="flex items-center gap-4">
            <Select defaultValue="today">
              <SelectTrigger className="w-40 border-gray-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="7days">Last 7 Days</SelectItem>
                <SelectItem value="30days">Last 30 Days</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Account Balance Section */}
        <Card className={`border ${isLowBalance ? 'border-orange-300 bg-orange-50' : 'border-gray-300'}`}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  isLowBalance ? 'bg-orange-100' : 'bg-green-100'
                }`}>
                  <Wallet className={`h-6 w-6 ${isLowBalance ? 'text-orange-600' : 'text-green-600'}`} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-2xl text-gray-900">₹{currentBalance.toFixed(2)}</p>
                    {isLowBalance && <AlertCircle className="h-5 w-5 text-orange-500" />}
                  </div>
                  <p className={`text-sm ${isLowBalance ? 'text-orange-700' : 'text-gray-600'}`}>
                    {isLowBalance ? 'Account Balance - Low Balance Warning' : 'Account Balance'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {isLowBalance && (
                  <div className="text-right mr-4">
                    <p className="text-sm text-orange-700 mb-1">Recharge recommended</p>
                    <p className="text-xs text-orange-600">Add credits to continue messaging</p>
                  </div>
                )}
                <Button className="bg-gray-800 hover:bg-gray-700">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Recharge Account
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border border-gray-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Send className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl text-gray-900">1,247</p>
                  <p className="text-sm text-gray-600">Total Vouchers Sent</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <FileText className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl text-gray-900">1,189</p>
                  <p className="text-sm text-gray-600">Successfully Delivered</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl text-gray-900">32</p>
                  <p className="text-sm text-gray-600">Pending</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <p className="text-2xl text-gray-900">26</p>
                  <p className="text-sm text-gray-600">Failed</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chart */}
        <Card className="border border-gray-300">
          <CardHeader>
            <CardTitle className="text-lg text-gray-900">Vouchers Sent (Last 7 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="day" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Bar dataKey="vouchers" fill="#6b7280" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity Table */}
        <Card className="border border-gray-300">
          <CardHeader>
            <CardTitle className="text-lg text-gray-900">Recent Voucher Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-gray-300">
                  <TableHead className="text-gray-700">Voucher Type</TableHead>
                  <TableHead className="text-gray-700">Voucher No.</TableHead>
                  <TableHead className="text-gray-700">Customer</TableHead>
                  <TableHead className="text-gray-700">Amount</TableHead>
                  <TableHead className="text-gray-700">Status</TableHead>
                  <TableHead className="text-gray-700">Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentVouchers.map((voucher, index) => (
                  <TableRow key={index} className="border-gray-300">
                    <TableCell className="text-gray-600">{voucher.type}</TableCell>
                    <TableCell className="text-gray-600">{voucher.voucher}</TableCell>
                    <TableCell className="text-gray-600">{voucher.customer}</TableCell>
                    <TableCell className="text-gray-600">{voucher.amount}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded text-xs ${
                        voucher.status === 'Delivered' 
                          ? 'bg-green-100 text-green-800' 
                          : voucher.status === 'Sent'
                          ? 'bg-blue-100 text-blue-800'
                          : voucher.status === 'Failed'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {voucher.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-gray-500 text-sm">{voucher.time}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}