import { json, type LoaderFunctionArgs } from "@shopify/remix-oxygen";
import { useLoaderData } from "@remix-run/react";
import { requireAdmin } from "~/lib/auth.server";
import AdminLayout from "~/components/Admin/AdminLayout";

export async function loader({ request, context }: LoaderFunctionArgs) {
  await requireAdmin(request, context.env);

  // TODO: Fetch actual stats from Admin API
  const stats = {
    totalProducts: 0,
    featuredProducts: 0,
    totalCollections: 0,
    totalOrders: 0,
  };

  return json({ stats });
}

export default function AdminDashboard() {
  const { stats } = useLoaderData<typeof loader>();

  return (
    <AdminLayout>
      <div>
        <h2 className="text-3xl font-bold mb-8">Dashboard</h2>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-sm text-gray-600 mb-2">Total Products</div>
            <div className="text-3xl font-bold">{stats.totalProducts}</div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-sm text-gray-600 mb-2">Featured Products</div>
            <div className="text-3xl font-bold">{stats.featuredProducts}</div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-sm text-gray-600 mb-2">Collections</div>
            <div className="text-3xl font-bold">{stats.totalCollections}</div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-sm text-gray-600 mb-2">Total Orders</div>
            <div className="text-3xl font-bold">{stats.totalOrders}</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/admin/products/new"
              className="btn btn-primary text-center"
            >
              Add New Product
            </a>
            <a
              href="/admin/collections/new"
              className="btn btn-secondary text-center"
            >
              Create Collection
            </a>
            <a href="/admin/orders" className="btn btn-secondary text-center">
              View Orders
            </a>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
