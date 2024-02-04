import { Button } from "@/components/ui/button"

export default function LogoutButton() {
  return (
    <form action="/auth/sign-out" method="post">
      <Button className="w-full" variant="ghost">Logout</Button>
    </form>
  )
}
