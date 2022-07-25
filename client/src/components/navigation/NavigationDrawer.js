/** @format */
// noinspection SpellCheckingInspection

import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AppsIcon from '@mui/icons-material/Apps';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ConstructionIcon from '@mui/icons-material/Construction';
import CurrencyPoundIcon from '@mui/icons-material/CurrencyPound';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import HelpIcon from '@mui/icons-material/Help';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import StarBorder from '@mui/icons-material/StarBorder';
import {
	Box,
	CssBaseline,
	Divider,
	IconButton,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
} from '@mui/material';
import Collapse from '@mui/material/Collapse';
import MuiDrawer from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import LetterM from '../home/letter-m.png';
import LetterP from '../home/letter-p.png';
import LetterW from '../home/letter-w.png';
import PageTitle from './PageTitle';

const drawerWidth = 220;

const processingItems = [
	{
		text: 'HOME',
		icon: <HomeIcon color='contrasting' fontSize='large' />,
		path: '/',
	},
	{
		text: 'PROJECTS',
		icon: <ConstructionIcon color='contrasting' fontSize='large' />,
		path: '/projects',
	},
	{
		text: 'APPLICATIONS',
		icon: <CurrencyPoundIcon color='contrasting' fontSize='large' />,
		path: '/',
	},
	{
		text: 'TEST',
		icon: <StarBorder color='contrasting' fontSize='large' />,
		path: '/testing',
	},
];

const adminItems = {
	text: 'ADMIN',
	icon: <AdminPanelSettingsIcon color='contrasting' fontSize='large' />,
	path: '/admin',
	subMenu: [
		{
			text: 'PROJECTS',
			icon: <AppsIcon color='contrasting' fontSize='medium' />,
			path: '/admin/projects',
		},
		{
			text: 'PERIODS',
			icon: <AppsIcon color='contrasting' fontSize='medium' />,
			path: '/',
		},
		{
			text: 'APPLICATIONS',
			icon: <AppsIcon color='contrasting' fontSize='medium' />,
			path: '/',
		},
		{
			text: 'DOCUMENTS',
			icon: <AppsIcon color='contrasting' fontSize='medium' />,
			path: '/admin/documents',
		},
	],
};
const infoItems = [
	{
		text: 'DASHBOARD',
		icon: <DashboardIcon color='contrasting' fontSize='large' />,
		path: '/dashboard',
	},
	{
		text: 'REPORTS',
		icon: <DocumentScannerIcon color='contrasting' fontSize='large' />,
		path: '/',
	},
];

const enquiryItems = {
	text: 'ENQUIRIES',
	icon: <HelpIcon color='contrasting' fontSize='large' />,
	path: '/',
	subMenu: [
		{
			text: 'APPLICATIONS',
			icon: <AppsIcon color='contrasting' fontSize='medium' />,
			path: '/',
		},
		{
			text: 'FINANCIAL',
			icon: <AppsIcon color='contrasting' fontSize='medium' />,
			path: '/',
		},
		{
			text: 'PROJECTS',
			icon: <AppsIcon color='contrasting' fontSize='medium' />,
			path: '/',
		},
	],
};
const openedMixin = (theme) => ({
	width: drawerWidth,
	background: '#22415e',
	color: 'white',
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: 'hidden',
});

const closedMixin = (theme) => ({
	background: '#22415e',
	color: 'white',
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: 'hidden',
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up('sm')]: {
		width: `calc(${theme.spacing(9)} + 1px)`,
	},
});

const DrawerHeader = styled('div', {
	shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
	height: 50,
	justifyContent: 'space-evenly',
	display: 'flex',
	alignItems: 'center',
	padding: theme.spacing(0, 1),
	...(open && {
		justifyContent: 'space-between',
		padding: theme.spacing(0, 2),
	}),
}));

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: 'nowrap',
	boxSizing: 'border-box',
	...(open && {
		...openedMixin(theme),
		'& .MuiDrawer-paper': openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		'& .MuiDrawer-paper': closedMixin(theme),
	}),
}));

const NavigationDrawer = ({ children }) => {
	const navigate = useNavigate();
	const [open, setOpen] = React.useState(true);
	const [adminOpen, setAdminOpen] = React.useState(false);
	const [enquiriesOpen, setEnquiriesOpen] = React.useState(false);

	function handleDrawerOpen() {
		setOpen(true);
	}

	function handleDrawerClose() {
		setOpen(false);
	}

	function handleAdminClick() {
		setAdminOpen(!adminOpen);
		handleDrawerOpen();
	}

	function handleEnquiriesClick() {
		setEnquiriesOpen(!enquiriesOpen);
		handleDrawerOpen();
	}

	// noinspection SpellCheckingInspection
	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<Drawer variant='permanent' open={open}>
				<DrawerHeader open={open}>
					{open && (
						<IconButton
							edge='end'
							sx={{ p: 2 }}
							disableTouchRipple
							onClick={() => navigate('/')}
						>
							<img src={LetterW} height={40} alt={'W'} />
							<img src={LetterP} height={40} alt={'P'} />
							<img src={LetterM} height={40} alt={'M'} />
						</IconButton>
					)}
					{!open && (
						<IconButton
							color='inherit'
							aria-label='open drawer'
							onClick={handleDrawerOpen}
							edge='start'
						>
							<MenuIcon fontSize='large' />
						</IconButton>
					)}
					{open && (
						<IconButton onClick={handleDrawerClose} disableTouchRipple>
							<ChevronLeftIcon color='contrasting' fontSize='large' />
						</IconButton>
					)}
				</DrawerHeader>
				<Divider color='white' />
				<List>
					{processingItems.map((item) => (
						<ListItem
							divider
							button
							key={item.text}
							sx={{ mt: 1, mb: 1 }}
							onClick={() => navigate(item.path)}
						>
							<ListItemIcon>{item.icon}</ListItemIcon>
							<ListItemText color='white' primary={item.text} />
						</ListItem>
					))}
					<Divider color='white' />
					{infoItems.map((item) => (
						<ListItem
							button
							divider
							key={item.text}
							sx={{ mt: 1, mb: 1 }}
							onClick={() => navigate(item.path)}
						>
							<ListItemIcon>{item.icon}</ListItemIcon>
							<ListItemText primary={item.text} />
						</ListItem>
					))}
					<ListItem
						button
						divider
						sx={{ mt: 1, mb: 1 }}
						onClick={handleEnquiriesClick}
					>
						<ListItemIcon>{enquiryItems.icon}</ListItemIcon>
						<ListItemText primary={enquiryItems.text} />
						{enquiriesOpen ? <ExpandLess /> : <ExpandMore />}
					</ListItem>
					<Collapse in={enquiriesOpen} timeout={'auto'} unmountOnExit>
						<List component={'div'}>
							{enquiryItems.subMenu.map((item) => (
								<ListItem
									//    secondaryAction={<div>HJHJKHJK</div>}
									//  disablePadding={true}
									dense
									divider
									button
									key={item.text}
									onClick={() => navigate(item.path)}
								>
									<ListItemIcon>{item.icon}</ListItemIcon>
									<ListItemText primary={item.text} />
								</ListItem>
							))}
						</List>
					</Collapse>
					{/* <ListItem
                        button
                        divider
                        sx={{mt: 1, mb: 1}}
                        onClick={handleReportsClick}>
                        <ListItemIcon>{reportingItems.icon}</ListItemIcon>
                        <ListItemText primary={reportingItems.text}/>
                        {reportsOpen ? <ExpandLess/> : <ExpandMore/>}
                    </ListItem> */}
					{/* <Collapse in={reportsOpen} timeout={'auto'} unmountOnExit>
						<List component={'div'}>
							{reportingItems.subMenu.map((item) => (
								<ListItem
									dense
									divider
									button
									key={item.text}
									onClick={() => navigate(item.path)}>
									<ListItemIcon>{item.icon}</ListItemIcon>
									<ListItemText primary={item.text} />
								</ListItem>
							))}
						</List>
					</Collapse> */}
					<Divider color='white' />
					<ListItem
						divider
						button
						sx={{ mt: 1, mb: 1 }}
						onClick={handleAdminClick}
					>
						<ListItemIcon>{adminItems.icon}</ListItemIcon>
						<ListItemText primary={adminItems.text} />
						{adminOpen ? <ExpandLess /> : <ExpandMore />}
					</ListItem>
					<Collapse in={adminOpen} timeout={'auto'} unmountOnExit={true}>
						<List component={'div'}>
							{adminItems.subMenu.map((item) => (
								<ListItem
									disablePadding={false}
									disableGutters={false}
									dense
									divider
									button
									key={item.text}
									onClick={() => navigate(item.path)}
								>
									<ListItemIcon>{item.icon}</ListItemIcon>
									<ListItemText primary={item.text} />
								</ListItem>
							))}
						</List>
					</Collapse>
					{/*    <Divider color='white'/>
						{/*</List>*/}
					{/*<List sx={{mt: 'auto'}}>*/}
					{/*    <ListItem button divider>*/}
					{/*        <ListItemIcon>*/}
					{/*            <LogoutIcon color='contrasting' fontSize='large'/>*/}
					{/*        </ListItemIcon>*/}
					{/*        <ListItemText primary={'LOGOUT'}/>*/}
					{/*    </ListItem>*/}
				</List>
			</Drawer>
			<Box component='main' width={'100%'}>
				<PageTitle />
				<Box ml={2} mr={2}>
					<Outlet />
				</Box>
			</Box>
		</Box>
	);
};

export default NavigationDrawer;
