import bcrypt from "bcryptjs";
import fs from "fs";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/database.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import models
const modelsDir = path.join(__dirname, "Models");
const modelFiles = fs
	.readdirSync(modelsDir)
	.filter((file) => file.endsWith(".js"));

// Import all models
for (const file of modelFiles) {
	await import(path.join(modelsDir, file));
}

// Sample data
const sampleData = {
	Organization: [
		{
			name: "WorkflowPadi HQ",
			website: "https://workflowpadi.com",
			acronym: "WPHQ",
			email: "contact@workflowpadi.com",
			phone: "+2341234567890",
			address: {
				street: "123 Innovation Drive",
				city: "Lagos",
				state: "Lagos",
				country: "Nigeria",
				postalCode: "100001",
			},
			isActive: true,
		},
		{
			name: "Tech Solutions Ltd",
			website: "https://techsolutions.ng",
			acronym: "TSL",
			email: "info@techsolutions.ng",
			phone: "+2349876543210",
			address: {
				street: "456 Tech Park",
				city: "Abuja",
				state: "FCT",
				country: "Nigeria",
				postalCode: "900001",
			},
			isActive: true,
		},
		{
			name: "Innovation Hub Africa",
			website: "https://innovationhub.africa",
			acronym: "IHA",
			email: "contact@innovationhub.africa",
			phone: "+2348765432109",
			address: {
				street: "789 Tech Valley",
				city: "Port Harcourt",
				state: "Rivers",
				country: "Nigeria",
				postalCode: "500001",
			},
			isActive: true,
		},
	],
	Department: [
		{
			name: "Engineering",
			description: "Software development and technical operations",
			isActive: true,
		},
		{
			name: "Human Resources",
			description: "Employee management and recruitment",
			isActive: true,
		},
		{
			name: "Finance",
			description: "Financial operations and accounting",
			isActive: true,
		},
		{
			name: "Marketing",
			description: "Brand management and marketing operations",
			isActive: true,
		},
	],
	Account: [
		{
			email: "admin@workflowpadi.com",
			password: await bcrypt.hash("admin123", 10),
			role: "admin",
			isActive: true,
			lastLogin: new Date(),
		},
		{
			email: "manager@techsolutions.ng",
			password: await bcrypt.hash("manager123", 10),
			role: "manager",
			isActive: true,
			lastLogin: new Date(),
		},
		{
			email: "hr@workflowpadi.com",
			password: await bcrypt.hash("hr123", 10),
			role: "hr",
			isActive: true,
			lastLogin: new Date(),
		},
		{
			email: "finance@workflowpadi.com",
			password: await bcrypt.hash("finance123", 10),
			role: "finance",
			isActive: true,
			lastLogin: new Date(),
		},
	],
	Employee: [
		{
			firstName: "John",
			lastName: "Doe",
			email: "john.doe@workflowpadi.com",
			phone: "+2341234567891",
			position: "Senior Developer",
			department: "Engineering",
			hireDate: new Date("2023-01-15"),
			salary: 500000,
			isActive: true,
		},
		{
			firstName: "Jane",
			lastName: "Smith",
			email: "jane.smith@techsolutions.ng",
			phone: "+2349876543211",
			position: "Project Manager",
			department: "Management",
			hireDate: new Date("2023-03-20"),
			salary: 450000,
			isActive: true,
		},
		{
			firstName: "Sarah",
			lastName: "Johnson",
			email: "sarah.j@workflowpadi.com",
			phone: "+2341234567893",
			position: "HR Manager",
			department: "Human Resources",
			hireDate: new Date("2023-02-10"),
			salary: 480000,
			isActive: true,
		},
		{
			firstName: "Michael",
			lastName: "Chen",
			email: "michael.c@techsolutions.ng",
			phone: "+2349876543213",
			position: "Finance Director",
			department: "Finance",
			hireDate: new Date("2023-04-15"),
			salary: 550000,
			isActive: true,
		},
		{
			firstName: "Aisha",
			lastName: "Ogunleye",
			email: "aisha.o@innovationhub.africa",
			phone: "+2348765432108",
			position: "Marketing Lead",
			department: "Marketing",
			hireDate: new Date("2023-05-20"),
			salary: 420000,
			isActive: true,
		},
	],
	Project: [
		{
			name: "WorkflowPadi Platform Upgrade",
			description: "Major platform upgrade to version 2.0",
			startDate: new Date("2024-01-01"),
			endDate: new Date("2024-06-30"),
			status: "in_progress",
			budget: 5000000,
			isActive: true,
		},
		{
			name: "Mobile App Development",
			description: "Development of iOS and Android apps",
			startDate: new Date("2024-02-01"),
			endDate: new Date("2024-08-31"),
			status: "planning",
			budget: 3000000,
			isActive: true,
		},
		{
			name: "Cloud Migration",
			description: "Migration of services to cloud infrastructure",
			startDate: new Date("2024-03-01"),
			endDate: new Date("2024-09-30"),
			status: "planning",
			budget: 2000000,
			isActive: true,
		},
	],
	Task: [
		{
			title: "Database Schema Design",
			description: "Design new database schema for v2.0",
			project: null, // Will be set after project creation
			assignedTo: null, // Will be set after employee creation
			dueDate: new Date("2024-02-28"),
			status: "in_progress",
			priority: "high",
			isActive: true,
		},
		{
			title: "API Development",
			description: "Develop new RESTful APIs",
			project: null,
			assignedTo: null,
			dueDate: new Date("2024-03-31"),
			status: "todo",
			priority: "high",
			isActive: true,
		},
		{
			title: "UI/UX Design",
			description: "Design new user interface",
			project: null,
			assignedTo: null,
			dueDate: new Date("2024-02-15"),
			status: "in_progress",
			priority: "medium",
			isActive: true,
		},
	],
	Vendor: [
		{
			name: "Cloud Services Provider",
			email: "contact@cloudservices.ng",
			phone: "+2341234567892",
			services: ["Cloud Hosting", "Server Maintenance"],
			isActive: true,
		},
		{
			name: "Office Supplies Co",
			email: "orders@officesupplies.ng",
			phone: "+2349876543212",
			services: ["Office Equipment", "Stationery"],
			isActive: true,
		},
		{
			name: "Cloud Infrastructure Ltd",
			email: "sales@cloudinfra.ng",
			phone: "+2341234567894",
			services: ["Cloud Storage", "CDN", "Load Balancing"],
			isActive: true,
		},
	],
	Leave: [
		{
			employee: null, // Will be set after employee creation
			leaveType: "Annual Leave",
			startDate: new Date("2024-03-01"),
			endDate: new Date("2024-03-05"),
			status: "pending",
			note: "Family vacation",
			isActive: true,
		},
		{
			employee: null,
			leaveType: "Sick Leave",
			startDate: new Date("2024-02-20"),
			endDate: new Date("2024-02-22"),
			status: "lineManagerApproved",
			note: "Medical appointment",
			isActive: true,
		},
		{
			employee: null,
			leaveType: "Annual Leave",
			startDate: new Date("2024-04-01"),
			endDate: new Date("2024-04-15"),
			status: "pending",
			note: "Summer vacation",
			isActive: true,
		},
	],
	PersonalInformation: [
		{
			employee: null, // Will be set after employee creation
			email: "john.doe.personal@workflowpadi.com",
			dateOfBirth: new Date("1990-05-15"),
			gender: "Male",
			nationality: "Nigerian",
			stateOfOrigin: "Lagos",
			lga: "Ikeja",
			religion: "Christianity",
			bloodGroup: "O+",
			isActive: true,
		},
		{
			employee: null,
			email: "jane.smith.personal@techsolutions.ng",
			dateOfBirth: new Date("1988-08-22"),
			gender: "Female",
			nationality: "Nigerian",
			stateOfOrigin: "Abuja",
			lga: "Garki",
			religion: "Islam",
			bloodGroup: "A+",
			isActive: true,
		},
	],
	BankDetail: [
		{
			employee: null,
			bankName: "First Bank",
			accountNumber: "1234567890",
			accountName: "John Doe",
			accountType: "Savings",
			isActive: true,
		},
		{
			employee: null,
			bankName: "Zenith Bank",
			accountNumber: "0987654321",
			accountName: "Jane Smith",
			accountType: "Current",
			isActive: true,
		},
	],
	NextOfKin: [
		{
			employee: null,
			name: "Mary Doe",
			relationship: "Spouse",
			phone: "+2341234567895",
			address: "123 Family Street, Lagos",
			isActive: true,
		},
		{
			employee: null,
			name: "James Smith",
			relationship: "Brother",
			phone: "+2349876543214",
			address: "456 Family Avenue, Abuja",
			isActive: true,
		},
	],
	MaritalDetail: [
		{
			employee: null,
			status: "married",
			spouseName: "Mary Doe",
			marriageDate: new Date("2018-06-15"),
			numberOfChildren: 2,
			isActive: true,
		},
		{
			employee: null,
			status: "single",
			spouseName: null,
			marriageDate: null,
			numberOfChildren: 0,
			isActive: true,
		},
	],
	Qualification: [
		{
			employee: null,
			institution: "University of Lagos",
			degree: "B.Sc Computer Science",
			yearOfGraduation: 2015,
			grade: "First Class",
			isActive: true,
		},
		{
			employee: null,
			institution: "Covenant University",
			degree: "M.Sc Business Administration",
			yearOfGraduation: 2018,
			grade: "Distinction",
			isActive: true,
		},
	],
	Guarantor: [
		{
			employee: null,
			name: "Robert Johnson",
			relationship: "Uncle",
			phone: "+2341234567896",
			address: "789 Guarantor Street, Lagos",
			occupation: "Business Owner",
			isActive: true,
		},
		{
			employee: null,
			name: "Sarah Williams",
			relationship: "Aunt",
			phone: "+2349876543215",
			address: "321 Guarantor Avenue, Abuja",
			occupation: "Medical Doctor",
			isActive: true,
		},
	],
	Benefit: [
		{
			employee: null,
			type: "health_insurance",
			provider: "HealthPlus",
			policyNumber: "HP123456",
			startDate: new Date("2024-01-01"),
			endDate: new Date("2024-12-31"),
			isActive: true,
		},
		{
			employee: null,
			type: "life_insurance",
			provider: "Leadway Assurance",
			policyNumber: "LW789012",
			startDate: new Date("2024-01-01"),
			endDate: new Date("2024-12-31"),
			isActive: true,
		},
	],
	Contract: [
		{
			employee: null,
			type: "full_time",
			startDate: new Date("2023-01-15"),
			endDate: new Date("2025-01-14"),
			probationPeriod: 3,
			noticePeriod: 1,
			isActive: true,
		},
		{
			employee: null,
			type: "full_time",
			startDate: new Date("2023-03-20"),
			endDate: new Date("2025-03-19"),
			probationPeriod: 3,
			noticePeriod: 1,
			isActive: true,
		},
	],
	Team: [
		{
			name: "Engineering Team",
			description: "Software development team",
			leader: null, // Will be set after employee creation
			members: [], // Will be set after employee creation
			department: null, // Will be set after department creation
			isActive: true,
		},
		{
			name: "HR Team",
			description: "Human Resources team",
			leader: null,
			members: [],
			department: null,
			isActive: true,
		},
	],
	KanbanTemplate: [
		{
			name: "Software Development",
			description: "Template for software development projects",
			columns: [], // Will be set after KanbanColumn creation
			isActive: true,
		},
		{
			name: "HR Processes",
			description: "Template for HR processes",
			columns: [],
			isActive: true,
		},
	],
	KanbanColumn: [
		{
			template: null, // Will be set after KanbanTemplate creation
			name: "To Do",
			order: 1,
			isActive: true,
		},
		{
			template: null,
			name: "In Progress",
			order: 2,
			isActive: true,
		},
		{
			template: null,
			name: "Review",
			order: 3,
			isActive: true,
		},
		{
			template: null,
			name: "Done",
			order: 4,
			isActive: true,
		},
	],
	ProjectFunder: [
		{
			project: null, // Will be set after project creation
			name: "Tech Innovation Fund",
			amount: 2000000,
			currency: "NGN",
			date: new Date("2024-01-15"),
			isActive: true,
		},
		{
			project: null,
			name: "Digital Transformation Grant",
			amount: 1500000,
			currency: "NGN",
			date: new Date("2024-02-01"),
			isActive: true,
		},
	],
	Comment: [
		{
			task: null, // Will be set after task creation
			user: null, // Will be set after employee creation
			content: "Initial design review completed",
			isActive: true,
		},
		{
			task: null,
			user: null,
			content: "API documentation needs updating",
			isActive: true,
		},
	],
	TimeSheet: [
		{
			employee: null,
			date: new Date("2024-02-15"),
			hoursWorked: 8,
			project: null,
			task: null,
			status: "approved",
			isActive: true,
		},
		{
			employee: null,
			date: new Date("2024-02-16"),
			hoursWorked: 7.5,
			project: null,
			task: null,
			status: "pending",
			isActive: true,
		},
	],
	PaySchedule: [
		{
			name: "Monthly Salary",
			frequency: "monthly",
			dayOfMonth: 25,
			isActive: true,
		},
		{
			name: "Bi-weekly Salary",
			frequency: "biweekly",
			dayOfWeek: "Friday",
			isActive: true,
		},
	],
	Payslip: [
		{
			employee: null,
			paySchedule: null,
			month: 2,
			year: 2024,
			basicSalary: 500000,
			allowances: 100000,
			deductions: 50000,
			netSalary: 550000,
			status: "paid",
			isActive: true,
		},
		{
			employee: null,
			paySchedule: null,
			month: 2,
			year: 2024,
			basicSalary: 450000,
			allowances: 90000,
			deductions: 45000,
			netSalary: 495000,
			status: "pending",
			isActive: true,
		},
	],
	PerformanceManagement: [
		{
			employee: null,
			period: "Q1 2024",
			startDate: new Date("2024-01-01"),
			endDate: new Date("2024-03-31"),
			goals: ["Complete project milestone", "Improve team collaboration"],
			status: "in_progress",
			isActive: true,
		},
		{
			employee: null,
			period: "Q1 2024",
			startDate: new Date("2024-01-01"),
			endDate: new Date("2024-03-31"),
			goals: ["Implement new HR policies", "Conduct team training"],
			status: "in_progress",
			isActive: true,
		},
	],
	LeaveType: [
		{
			name: "Annual Leave",
			description: "Regular annual vacation leave",
			defaultDays: 21,
			isActive: true,
		},
		{
			name: "Sick Leave",
			description: "Medical leave with doctor's note",
			defaultDays: 14,
			isActive: true,
		},
		{
			name: "Maternity Leave",
			description: "Leave for childbirth and care",
			defaultDays: 90,
			isActive: true,
		},
	],
	ExitManagement: [
		{
			employee: null,
			exitDate: new Date("2024-03-31"),
			reason: "Career Growth",
			status: "pending",
			clearanceStatus: "pending",
			isActive: true,
		},
	],
	Requisition: [
		{
			employee: null,
			type: "purchase",
			items: [
				{
					name: "Development Laptop",
					quantity: 1,
					unitPrice: 1200000,
					totalPrice: 1200000,
				},
			],
			totalAmount: 1200000,
			status: "pending",
			isActive: true,
		},
		{
			employee: null,
			type: "travel",
			items: [
				{
					name: "Flight Ticket",
					quantity: 1,
					unitPrice: 150000,
					totalPrice: 150000,
				},
				{
					name: "Hotel Accommodation",
					quantity: 3,
					unitPrice: 50000,
					totalPrice: 150000,
				},
			],
			totalAmount: 300000,
			status: "approved",
			isActive: true,
		},
	],
	AccountCode: [
		{
			code: "ACC001",
			name: "Operating Expenses",
			description: "General operating expenses account",
			isActive: true,
		},
		{
			code: "ACC002",
			name: "Capital Expenditure",
			description: "Capital equipment and assets account",
			isActive: true,
		},
	],
	BudgetCode: [
		{
			code: "BUD001",
			name: "Department Budget",
			description: "Department operational budget",
			amount: 5000000,
			period: "2024",
			isActive: true,
		},
		{
			code: "BUD002",
			name: "Project Budget",
			description: "Project development budget",
			amount: 10000000,
			period: "2024",
			isActive: true,
		},
	],
	Calendar: [
		{
			title: "Team Meeting",
			description: "Weekly team sync",
			startDate: new Date("2024-02-20 10:00:00"),
			endDate: new Date("2024-02-20 11:00:00"),
			type: "meeting",
			attendees: [], // Will be set after employee creation
			isActive: true,
		},
		{
			title: "Project Deadline",
			description: "Phase 1 completion",
			startDate: new Date("2024-02-28 17:00:00"),
			endDate: new Date("2024-02-28 17:00:00"),
			type: "deadline",
			attendees: [],
			isActive: true,
		},
	],
	Notification: [
		{
			recipient: null, // Will be set after employee creation
			title: "Leave Request Approved",
			message: "Your leave request has been approved",
			type: "leave",
			isRead: false,
			isActive: true,
		},
		{
			recipient: null,
			title: "New Task Assigned",
			message: "You have been assigned a new task",
			type: "task",
			isRead: false,
			isActive: true,
		},
	],
	RefreshToken: [
		{
			token: "refresh_token_1",
			user: null, // Will be set after account creation
			expiresAt: new Date("2024-03-20"),
			isActive: true,
		},
		{
			token: "refresh_token_2",
			user: null,
			expiresAt: new Date("2024-03-20"),
			isActive: true,
		},
	],
	Permission: [
		{
			name: "manage_employees",
			description: "Can manage employee records",
			isActive: true,
		},
		{
			name: "approve_leave",
			description: "Can approve leave requests",
			isActive: true,
		},
		{
			name: "manage_projects",
			description: "Can manage projects and tasks",
			isActive: true,
		},
	],
};

async function seedDatabase() {
	try {
		// Connect to database
		await connectDB();

		// Clear existing data
		console.log("Clearing existing data...");
		for (const modelName of Object.keys(sampleData)) {
			await mongoose.model(modelName).deleteMany({});
		}

		// Insert organizations
		console.log("Seeding organizations...");
		const organizations = await mongoose
			.model("Organization")
			.insertMany(sampleData.Organization);

		// Insert departments
		console.log("Seeding departments...");
		const departments = await mongoose.model("Department").insertMany(
			sampleData.Department.map((dept) => ({
				...dept,
				organizationId: organizations[0]._id, // Assign all departments to the first organization
			})),
		);

		// Insert accounts
		console.log("Seeding accounts...");
		const accounts = await mongoose.model("Account").insertMany(
			sampleData.Account.map((account, index) => ({
				...account,
				organizationId: organizations[index % organizations.length]._id, // Distribute accounts across organizations
			})),
		);

		// Insert employees with organization and department references
		console.log("Seeding employees...");
		const employees = await mongoose.model("Employee").insertMany(
			sampleData.Employee.map((emp, index) => ({
				...emp,
				organizationId: organizations[index % organizations.length]._id, // Distribute employees across organizations
				organization: organizations[index % organizations.length]._id, // Keep both fields in sync
				account: accounts[index % accounts.length]._id,
				department: departments[index % departments.length]._id,
			})),
		);

		// Insert projects
		console.log("Seeding projects...");
		const projects = await mongoose.model("Project").insertMany(
			sampleData.Project.map((project) => ({
				...project,
				organizationId: organizations[0]._id, // Add organizationId field
				organization: organizations[0]._id, // Keep organization field in sync
			})),
		);

		// Insert tasks with project and employee references
		console.log("Seeding tasks...");
		await mongoose.model("Task").insertMany(
			sampleData.Task.map((task, index) => ({
				...task,
				organizationId: organizations[0]._id, // Add organizationId field
				project: projects[index % projects.length]._id,
				assignedTo: employees[index % employees.length]._id,
				status: task.status === "in_progress" ? "inprogress" : task.status, // Fix status enum value
			})),
		);

		// Insert vendors
		console.log("Seeding vendors...");
		const vendors = await mongoose.model("Vendor").insertMany(
			sampleData.Vendor.map((vendor, index) => ({
				...vendor,
				organizationId: organizations[index % organizations.length]._id, // Distribute vendors across organizations
			})),
		);

		// Insert leave types first
		console.log("Seeding leave types...");
		const leaveTypes = await mongoose.model("LeaveType").insertMany(
			sampleData.LeaveType.map((leaveType) => ({
				...leaveType,
				organizationId: organizations[0]._id, // Assign all leave types to the first organization
			})),
		);

		// Insert leaves with employee references and leave type references
		console.log("Seeding leaves...");
		await mongoose.model("Leave").insertMany(
			sampleData.Leave.map((leave, index) => {
				const matchingLeaveType = leaveTypes.find(
					(lt) => lt.name.toLowerCase() === leave.leaveType.toLowerCase(),
				);

				if (!matchingLeaveType) {
					console.error(`No matching leave type found for: ${leave.leaveType}`);
					console.log(
						"Available leave types:",
						leaveTypes.map((lt) => lt.name),
					);
					throw new Error(
						`Leave type "${leave.leaveType}" not found in available leave types`,
					);
				}

				return {
					...leave,
					employee: employees[index % employees.length]._id,
					organizationId: organizations[index % organizations.length]._id,
					leaveType: matchingLeaveType._id,
				};
			}),
		);

		// Insert personal information
		console.log("Seeding personal information...");
		const personalInfo = await mongoose.model("PersonalInformation").insertMany(
			sampleData.PersonalInformation.map((info, index) => ({
				...info,
				employee: employees[index % employees.length]._id,
				organizationId: organizations[index % organizations.length]._id, // Add organizationId
			})),
		);

		console.log("Seeding bank details...");
		await mongoose.model("BankDetail").insertMany(
			sampleData.BankDetail.map((bank, index) => ({
				...bank,
				employee: employees[index % employees.length]._id,
				organizationId: organizations[index % organizations.length]._id, // Add organizationId
			})),
		);

		console.log("\nSample data seeded successfully!");
		console.log("\nYou can now view the data in MongoDB Compass:");
		console.log("1. Open MongoDB Compass");
		console.log("2. Connect to: mongodb://localhost:27017/workflowpadi");
		console.log("3. Browse the collections to see the sample data");

		// Close the connection
		await mongoose.connection.close();
		console.log("\nDatabase connection closed.");
	} catch (error) {
		console.error("Error seeding database:", error);
		process.exit(1);
	}
}

// Run the seeding function
seedDatabase();
