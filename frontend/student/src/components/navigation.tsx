import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export default function Navbar() {
  return (
    <div>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
                        <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
            <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
            <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
            <NavigationMenuTrigger>Item One</NavigationMenuTrigger>

            <NavigationMenuContent>
              <NavigationMenuLink>Link</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
