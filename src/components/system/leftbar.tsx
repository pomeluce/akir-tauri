import Logo from '/pomeluce.svg';
import { useSidebar } from '@common/shadcn';
import { menuIcons } from '@/config/menus';

const leftbar: React.FC<{}> = () => {
  const { open } = useSidebar();
  const { menus } = useMenuStore();

  return (
    <SuiSidebar collapsible="icon">
      <SuiSidebarHeader className="bg-backdrop2 pt-4">
        <SuiSidebarMenuItem>
          <SuiSidebarMenuButton asChild>
            <Link className="hover:text-word2" to={RouteTo.HOME}>
              <img className={open ? 'w-6 h-6' : 'w-4 h-4'} src={Logo} />
              {open && <span className="text-lg font-bold uppercase">rapidify-react</span>}
            </Link>
          </SuiSidebarMenuButton>
        </SuiSidebarMenuItem>
      </SuiSidebarHeader>
      <SuiSidebarContent className="bg-backdrop2">
        <SuiSidebarGroup>
          <SuiSidebarMenu>
            {menus.backend.map(item => (
              <SuiCollapsible asChild key={item.title} className="group/collapsible font-medium">
                <SuiSidebarMenuItem>
                  <SuiCollapsibleTrigger asChild>
                    <SuiSidebarMenuButton tooltip={{ children: item.title, className: 'bg-black' }}>
                      {menuIcons[item.key] && menuIcons[item.key]({ className: 'text-xl' })}
                      <span>{item.title}</span>
                      <IconRiArrowRightSLine className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SuiSidebarMenuButton>
                  </SuiCollapsibleTrigger>
                  <SuiCollapsibleContent>
                    <SuiSidebarMenuSub>
                      {item.children?.map(subItem => (
                        <SuiSidebarMenuSubItem key={subItem.key} className="hover:bg-fill2">
                          <SuiSidebarMenuSubButton asChild>
                            <Link
                              to={subItem.to}
                              target={subItem.blank}
                              className="hover:text-primary6"
                              activeOptions={{ exact: true }}
                              activeProps={{ className: 'text-primary6' }}
                            >
                              <span>{subItem.title}</span>
                            </Link>
                          </SuiSidebarMenuSubButton>
                        </SuiSidebarMenuSubItem>
                      ))}
                    </SuiSidebarMenuSub>
                  </SuiCollapsibleContent>
                </SuiSidebarMenuItem>
              </SuiCollapsible>
            ))}
          </SuiSidebarMenu>
        </SuiSidebarGroup>
      </SuiSidebarContent>
    </SuiSidebar>
  );
};

export default leftbar;
