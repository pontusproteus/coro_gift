export default function NoVouchersPage() {
  return (
    <div className="space-y-4 text-center">
      <h2 className="text-2xl">¿Qué? ¿No queda dinero?</h2>
      <div className="flex justify-center">
        <img src="/no-vouchers.png" alt="No vouchers available" className="max-w-xs rounded" />
      </div>
      <p>There are no vouchers available right now. Please check back later.</p>
    </div>
  )
}

