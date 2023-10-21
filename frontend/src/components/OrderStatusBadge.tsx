import { Badge } from "@chakra-ui/react";
interface StatusBadgeProps {
  type: string;
}
export default function OrderStatusBadge(props: StatusBadgeProps) {
  function BadgeFactory(status: string) {
    switch (status) {
      case "PENDING":
        return (
          <Badge variant={"solid"} colorScheme="yellow">
            PENDING
          </Badge>
        );
      case "DONE":
        return (
          <Badge variant={"solid"} colorScheme="green">
            COMPLETED
          </Badge>
        );
      default:
        return (
          <Badge variant={"subtle"} colorScheme="gray">
            NA
          </Badge>
        );
    }
  }
  return BadgeFactory(props.type);
}
