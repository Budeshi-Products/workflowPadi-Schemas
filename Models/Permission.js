import mongoose from "mongoose";
const { Schema } = mongoose;

const PermissionSchema = new Schema(
	{
		employee: {
			type: Schema.Types.ObjectId,
			ref: "Employee",
			required: true,
		},
		// BoomerangHR Permissions
		boomerangHR: {
			name: { type: String, default: "BoomerangHR" },
			description: {
				type: String,
				default: "Human resources management system",
			},
			access: { type: Boolean, default: false },
			leaveManagement: {
				name: { type: String, default: "Leave Management" },
				description: {
					type: String,
					default: "Manage employee leave and time off",
				},
				access: { type: Boolean, default: false },
				viewLeaveRequests: {
					name: { type: String, default: "View Leave Requests" },
					description: {
						type: String,
						default: "Access to view all leave requests",
					},
					enabled: { type: Boolean, default: false },
				},
				approveLeaveRequests: {
					name: { type: String, default: "Approve Leave Requests" },
					description: {
						type: String,
						default: "Authority to approve or reject leave requests",
					},
					enabled: { type: Boolean, default: false },
				},
				manageLeaveTypes: {
					name: { type: String, default: "Manage Leave Types" },
					description: {
						type: String,
						default: "Create and manage leave types and allocations",
					},
					enabled: { type: Boolean, default: false },
				},
				viewLeaveBalances: {
					name: { type: String, default: "View Leave Balances" },
					description: {
						type: String,
						default: "Access to view employee leave balances",
					},
					enabled: { type: Boolean, default: false },
				},
				manageLeavePolicies: {
					name: { type: String, default: "Manage Leave Policies" },
					description: {
						type: String,
						default: "Configure leave policies and rules",
					},
					enabled: { type: Boolean, default: false },
				},
			},
			payroll: {
				name: { type: String, default: "Payroll" },
				description: {
					type: String,
					default: "Manage payment and compensation data",
				},
				access: { type: Boolean, default: false },
				viewPayroll: {
					name: { type: String, default: "View Payroll" },
					description: {
						type: String,
						default: "Access to view salary and payment information",
					},
					enabled: { type: Boolean, default: false },
				},
				createPayroll: {
					name: { type: String, default: "Create Payroll" },
					description: {
						type: String,
						default: "Ability to create new payroll records",
					},
					enabled: { type: Boolean, default: false },
				},
				editPayroll: {
					name: { type: String, default: "Edit Payroll" },
					description: {
						type: String,
						default: "Ability to modify payment configurations and structures",
					},
					enabled: { type: Boolean, default: false },
				},
				manageBenefits: {
					name: { type: String, default: "Manage Benefits" },
					description: {
						type: String,
						default: "Manage employee benefits, loans, and advances",
					},
					enabled: { type: Boolean, default: false },
				},
				approvePayroll: {
					name: { type: String, default: "Approve Payroll" },
					description: {
						type: String,
						default: "Authority to approve payroll processing",
					},
					enabled: { type: Boolean, default: false },
				},
				managePaySchedules: {
					name: { type: String, default: "Manage Pay Schedules" },
					description: {
						type: String,
						default: "Configure payment schedules and periods",
					},
					enabled: { type: Boolean, default: false },
				},
				viewPayrollReports: {
					name: { type: String, default: "View Payroll Reports" },
					description: {
						type: String,
						default: "Access payroll reports and analytics",
					},
					enabled: { type: Boolean, default: false },
				},
			},
			employeeManagement: {
				name: { type: String, default: "Employee Management" },
				description: {
					type: String,
					default: "Manage employee information and roles",
				},
				access: { type: Boolean, default: false },
				manageProfiles: {
					name: { type: String, default: "Manage Profiles" },
					description: {
						type: String,
						default: "Create, edit and manage employee profiles",
					},
					enabled: { type: Boolean, default: false },
				},
				updateStatus: {
					name: { type: String, default: "Update Status" },
					description: {
						type: String,
						default: "Update employee status",
					},
					enabled: { type: Boolean, default: false },
				},
				manageOnboarding: {
					name: { type: String, default: "Manage Onboarding" },
					description: {
						type: String,
						default: "Manage employee onboarding process",
					},
					enabled: { type: Boolean, default: false },
				},
				manageExitProcess: {
					name: { type: String, default: "Manage Exit Process" },
					description: {
						type: String,
						default: "Handle employee exit and offboarding",
					},
					enabled: { type: Boolean, default: false },
				},
				viewEmployeeDocuments: {
					name: { type: String, default: "View Employee Documents" },
					description: {
						type: String,
						default: "Access employee documents and records",
					},
					enabled: { type: Boolean, default: false },
				},
				manageQualifications: {
					name: { type: String, default: "Manage Qualifications" },
					description: {
						type: String,
						default: "Manage employee qualifications and certifications",
					},
					enabled: { type: Boolean, default: false },
				},
			},
			attendanceManagement: {
				name: { type: String, default: "Attendance Management" },
				description: {
					type: String,
					default: "Manage employee attendance and time tracking",
				},
				access: { type: Boolean, default: false },
				viewAttendance: {
					name: { type: String, default: "View Attendance" },
					description: {
						type: String,
						default: "View employee attendance records",
					},
					enabled: { type: Boolean, default: false },
				},
				manageAttendance: {
					name: { type: String, default: "Manage Attendance" },
					description: {
						type: String,
						default: "Manage and modify attendance records",
					},
					enabled: { type: Boolean, default: false },
				},
				approveTimeSheets: {
					name: { type: String, default: "Approve Time Sheets" },
					description: {
						type: String,
						default: "Approve employee time sheets",
					},
					enabled: { type: Boolean, default: false },
				},
				manageWorkSchedules: {
					name: { type: String, default: "Manage Work Schedules" },
					description: {
						type: String,
						default: "Configure work schedules and shifts",
					},
					enabled: { type: Boolean, default: false },
				},
			},
			performanceManagement: {
				name: { type: String, default: "Performance Management" },
				description: {
					type: String,
					default: "Manage employee performance and reviews",
				},
				access: { type: Boolean, default: false },
				viewPerformance: {
					name: { type: String, default: "View Performance" },
					description: {
						type: String,
						default: "View performance reviews and ratings",
					},
					enabled: { type: Boolean, default: false },
				},
				conductReviews: {
					name: { type: String, default: "Conduct Reviews" },
					description: {
						type: String,
						default: "Conduct performance reviews",
					},
					enabled: { type: Boolean, default: false },
				},
				manageGoals: {
					name: { type: String, default: "Manage Goals" },
					description: {
						type: String,
						default: "Set and manage performance goals",
					},
					enabled: { type: Boolean, default: false },
				},
				approveReviews: {
					name: { type: String, default: "Approve Reviews" },
					description: {
						type: String,
						default: "Approve performance reviews",
					},
					enabled: { type: Boolean, default: false },
				},
				manageCompetencies: {
					name: { type: String, default: "Manage Competencies" },
					description: {
						type: String,
						default: "Define and manage competency frameworks",
					},
					enabled: { type: Boolean, default: false },
				},
			},
			reporting: {
				name: { type: String, default: "Reporting" },
				description: {
					type: String,
					default: "Access and generate HR reports",
				},
				access: { type: Boolean, default: false },
				viewReports: {
					name: { type: String, default: "View Reports" },
					description: {
						type: String,
						default: "Access HR reports and analytics",
					},
					enabled: { type: Boolean, default: false },
				},
				generateReports: {
					name: { type: String, default: "Generate Reports" },
					description: {
						type: String,
						default: "Create custom HR reports",
					},
					enabled: { type: Boolean, default: false },
				},
				exportData: {
					name: { type: String, default: "Export Data" },
					description: {
						type: String,
						default: "Export HR data and reports",
					},
					enabled: { type: Boolean, default: false },
				},
				manageDashboards: {
					name: { type: String, default: "Manage Dashboards" },
					description: {
						type: String,
						default: "Configure and manage HR dashboards",
					},
					enabled: { type: Boolean, default: false },
				},
			},
		},

		// Amebo Permissions
		amebo: {
			name: { type: String, default: "Amebo" },
			description: { type: String, default: "Internal communication platform" },
			access: { type: Boolean, default: false },
			messaging: {
				name: { type: String, default: "Messaging" },
				description: { type: String, default: "Send and receive messages" },
				access: { type: Boolean, default: false },
				sendMessages: {
					name: { type: String, default: "Send Messages" },
					description: {
						type: String,
						default: "Ability to send messages to users and channels",
					},
					enabled: { type: Boolean, default: false },
				},
				manageChannels: {
					name: { type: String, default: "Manage Channels" },
					description: {
						type: String,
						default: "Create, modify and delete communication channels",
					},
					enabled: { type: Boolean, default: false },
				},
			},
			notifications: {
				name: { type: String, default: "Notifications" },
				description: { type: String, default: "System and user alerts" },
				access: { type: Boolean, default: false },
				createAlerts: {
					name: { type: String, default: "Create Alerts" },
					description: {
						type: String,
						default: "Create notification alerts for users or groups",
					},
					enabled: { type: Boolean, default: false },
				},
				viewAlerts: {
					name: { type: String, default: "View Alerts" },
					description: {
						type: String,
						default: "Access to view current and past system alerts",
					},
					enabled: { type: Boolean, default: false },
				},
			},
			// New Project Management permissions
			projectManagement: {
				name: { type: String, default: "Project Management" },
				description: {
					type: String,
					default: "Manage projects and project resources",
				},
				access: { type: Boolean, default: false },
				createProjects: {
					name: { type: String, default: "Create Projects" },
					description: {
						type: String,
						default: "Create new projects in the system",
					},
					enabled: { type: Boolean, default: false },
				},
				editProjects: {
					name: { type: String, default: "Edit Projects" },
					description: {
						type: String,
						default: "Modify existing project details and settings",
					},
					enabled: { type: Boolean, default: false },
				},
				assignMembers: {
					name: { type: String, default: "Assign Members" },
					description: {
						type: String,
						default: "Add or remove team members from projects",
					},
					enabled: { type: Boolean, default: false },
				},
			},
			// Task Management permissions
			taskManagement: {
				name: { type: String, default: "Task Management" },
				description: { type: String, default: "Manage tasks and assignments" },
				access: { type: Boolean, default: false },
				createTasks: {
					name: { type: String, default: "Create Tasks" },
					description: {
						type: String,
						default: "Create new tasks within projects",
					},
					enabled: { type: Boolean, default: false },
				},
				assignTasks: {
					name: { type: String, default: "Assign Tasks" },
					description: {
						type: String,
						default: "Assign tasks to team members",
					},
					enabled: { type: Boolean, default: false },
				},
				updateTaskStatus: {
					name: { type: String, default: "Update Task Status" },
					description: {
						type: String,
						default:
							"Change the status of tasks (e.g., to-do, in progress, completed)",
					},
					enabled: { type: Boolean, default: false },
				},
			},
			// Reporting permissions
			reporting: {
				name: { type: String, default: "Reporting" },
				description: {
					type: String,
					default: "Access and generate project reports",
				},
				access: { type: Boolean, default: false },
				viewReports: {
					name: { type: String, default: "View Reports" },
					description: {
						type: String,
						default: "Access project performance and status reports",
					},
					enabled: { type: Boolean, default: false },
				},
				generateReports: {
					name: { type: String, default: "Generate Reports" },
					description: {
						type: String,
						default: "Create project reports",
					},
					enabled: { type: Boolean, default: false },
				},
				exportData: {
					name: { type: String, default: "Export Data" },
					description: {
						type: String,
						default: "Export project data and reports",
					},
					enabled: { type: Boolean, default: false },
				},
				manageDashboards: {
					name: { type: String, default: "Manage Dashboards" },
					description: {
						type: String,
						default: "Configure and manage project dashboards",
					},
					enabled: { type: Boolean, default: false },
				},
			},
		},

		// Gwapp Permissions
		gwapp: {
			name: { type: String, default: "Gwapp" },
			description: {
				type: String,
				default: "Finance, and procurement management",
			},
			access: { type: Boolean, default: false },
			requisition: {
				name: { type: String, default: "Requisitions" },
				description: { type: String, default: "Manage purchase requisitions" },
				access: { type: Boolean, default: false },
				raiseRequisitions: {
					name: { type: String, default: "Raise Requisitions" },
					description: {
						type: String,
						default: "Create new purchase requisitions",
					},
					enabled: { type: Boolean, default: false },
				},
				reviewRequisitions: {
					name: { type: String, default: "Review Requisitions" },
					description: {
						type: String,
						default: "Access and review raised requisitions",
					},
					enabled: { type: Boolean, default: false },
				},
				approveRequisitions: {
					name: { type: String, default: "Approve Requisitions" },
					description: {
						type: String,
						default: "Access and approve raised requisitions",
					},
					enabled: { type: Boolean, default: false },
				},
			},
			procurement: {
				name: { type: String, default: "Procurement" },
				description: {
					type: String,
					default: "Manage supplier and vendor information",
				},
				access: { type: Boolean, default: false },
				addVendors: {
					name: { type: String, default: "Add Vendors" },
					description: {
						type: String,
						default: "Create and register new vendor accounts",
					},
					enabled: { type: Boolean, default: false },
				},
				viewVendorDetails: {
					name: { type: String, default: "View Vendor Details" },
					description: {
						type: String,
						default: "Access vendor information and transaction history",
					},
					enabled: { type: Boolean, default: false },
				},
				editVendorDetails: {
					name: { type: String, default: "Edit Vendor Details" },
					description: {
						type: String,
						default: "Modify vendor information and settings",
					},
					enabled: { type: Boolean, default: false },
				},
				createPurchaseOrders: {
					name: { type: String, default: "Create Purchase Orders" },
					description: {
						type: String,
						default: "Ability to create new purchase orders",
					},
					enabled: { type: Boolean, default: false },
				},
				viewPurchaseOrders: {
					name: { type: String, default: "View Purchase Orders" },
					description: {
						type: String,
						default: "Access purchase order details and history",
					},
					enabled: { type: Boolean, default: false },
				},
				editPurchaseOrders: {
					name: { type: String, default: "Edit Purchase Orders" },
					description: {
						type: String,
						default: "Modify purchase order details and settings",
					},
					enabled: { type: Boolean, default: false },
				},
				approvePurchaseOrders: {
					name: { type: String, default: "Approve Purchase Orders" },
					description: {
						type: String,
						default: "Authority to approve purchase orders",
					},
					enabled: { type: Boolean, default: false },
				},
			},
			reporting: {
				name: { type: String, default: "Reporting" },
				description: {
					type: String,
					default: "Access and generate project reports",
				},
				access: { type: Boolean, default: false },
				viewReports: {
					name: { type: String, default: "View Reports" },
					description: {
						type: String,
						default: "Access project performance and status reports",
					},
					enabled: { type: Boolean, default: false },
				},
				generateReports: {
					name: { type: String, default: "Generate Reports" },
					description: {
						type: String,
						default: "Create custom financial reports",
					},
					enabled: { type: Boolean, default: false },
				},
				exportData: {
					name: { type: String, default: "Export Data" },
					description: {
						type: String,
						default: "Export project data and reports",
					},
					enabled: { type: Boolean, default: false },
				},
				manageDashboards: {
					name: { type: String, default: "Manage Dashboards" },
					description: {
						type: String,
						default: "Configure and manage financial dashboards",
					},
					enabled: { type: Boolean, default: false },
				},
			},
		},

		// System Admin Permissions
		systemAdmin: {
			name: { type: String, default: "System Admin" },
			description: {
				type: String,
				default: "Full access to all system features and settings",
			},
			access: { type: Boolean, default: false },
			userManagement: {
				name: { type: String, default: "User Management" },
				description: {
					type: String,
					default: "Manage system users and their permissions",
				},
				access: { type: Boolean, default: false },
				manageUsers: {
					name: { type: String, default: "Manage Users" },
					description: {
						type: String,
						default: "Create, edit and delete system users",
					},
					enabled: { type: Boolean, default: false },
				},
				managePermissions: {
					name: { type: String, default: "Manage Permissions" },
					description: {
						type: String,
						default: "Modify user permissions and access levels",
					},
					enabled: { type: Boolean, default: false },
				},
			},
			systemSettings: {
				name: { type: String, default: "System Settings" },
				description: {
					type: String,
					default: "Manage system-wide configurations and settings",
				},
				access: { type: Boolean, default: false },
				manageSettings: {
					name: { type: String, default: "Manage Settings" },
					description: {
						type: String,
						default: "Configure system-wide settings and parameters",
					},
					enabled: { type: Boolean, default: false },
				},
				viewSystem: {
					name: { type: String, default: "View Organization" },
					description: {
						type: String,
						default: "View System Details and Overview",
					},
					enabled: { type: Boolean, default: false },
				},
			},
			manageDepartments: {
				name: { type: String, default: "Manage Departments" },
				description: {
					type: String,
					default: "Create, edit and manage organizational departments",
				},
				access: { type: Boolean, default: false },
				createDepartment: {
					name: { type: String, default: "Create Department" },
					description: {
						type: String,
						default: "Create a new department",
					},
					enabled: { type: Boolean, default: false },
				},
				editDepartment: {
					name: { type: String, default: "Edit Department" },
					description: {
						type: String,
						default: "Modify existing department details and settings",
					},
					enabled: { type: Boolean, default: false },
				},
				deleteDepartment: {
					name: { type: String, default: "Delete Department" },
					description: {
						type: String,
						default: "Delete an existing department",
					},
					enabled: { type: Boolean, default: false },
				},
				addMembersToDepartment: {
					name: { type: String, default: "Add Member to Department" },
					description: {
						type: String,
						default: "Add a new member to an existing department",
					},
					enabled: { type: Boolean, default: false },
				},
				removeMembersFromDepartment: {
					name: { type: String, default: "Remove Member from Department" },
					description: {
						type: String,
						default: "Remove a member from an existing department",
					},
					enabled: { type: Boolean, default: false },
				},
				viewDepartmentMembers: {
					name: { type: String, default: "View Department Members" },
					description: {
						type: String,
						default: "View all members of an existing department",
					},
					enabled: { type: Boolean, default: false },
				},
			},
		},
		organizationId: {
			type: Schema.Types.ObjectId,
			ref: "Organization",
			required: true,
			index: true, // index for query performance
		},
	},
	{ timestamps: true },
);

PermissionSchema.index({ organizationId: 1, employee: 1 });

const Permission = mongoose.model("Permission", PermissionSchema);
export default Permission;
export { PermissionSchema as schema };
