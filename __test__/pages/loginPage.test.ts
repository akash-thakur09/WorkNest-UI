import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import {loginService} from '../../src/services/authService';
import { useNavigate } from 'react-router-dom';
import LoginPage from "../../src/pages/Common/LoginPage";

jest.mock("../../services/authService");
const mockedLoginService = loginService as jest.Mock;

// mock useNavigate from react-router
const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

describe("LoginPage", () => {
  beforeEach(() => {
    mockedLoginService.mockReset();
    mockedNavigate.mockReset();
  });

  const renderComponent = () =>
    render(<LoginPage />);

  it("renders email and password fields", () => {
    renderComponent();

    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByText("Sign In")).toBeInTheDocument();
  });

  it("submits login credentials successfully", async () => {
    const mockUser = {
      id: "123",
      fullName: "Test User",
      email: "test@example.com",
      role: "Employee",
      managerId: "456",
    };

    const mockToken = "mock-jwt-token";

    mockedLoginService.mockResolvedValue({
      user: mockUser,
      token: mockToken,
    });

    renderComponent();

    userEvent.type(screen.getByPlaceholderText("Email"), "test@example.com");
    userEvent.type(screen.getByPlaceholderText("Password"), "password123");

    fireEvent.click(screen.getByText("Sign In"));

    await waitFor(() => {
      expect(mockedLoginService).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      });

      expect(localStorage.getItem("token")).toBe(mockToken);
      expect(localStorage.getItem("employeeId")).toBe(mockUser.id);
      expect(localStorage.getItem("managerId")).toBe(mockUser.managerId);
      expect(localStorage.getItem("role")).toBe(mockUser.role);

      expect(mockedNavigate).toHaveBeenCalledWith("/home");
    });
  });

  it("shows alert and resets form on failed login", async () => {
    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});
    mockedLoginService.mockRejectedValue(new Error("Invalid credentials"));

    renderComponent();

    userEvent.type(screen.getByPlaceholderText("Email"), "wrong@example.com");
    userEvent.type(screen.getByPlaceholderText("Password"), "wrongpass");

    fireEvent.click(screen.getByText("Sign In"));

    await waitFor(() => {
      expect(mockedLoginService).toHaveBeenCalledWith({
        email: "wrong@example.com",
        password: "wrongpass",
      });

      expect(alertSpy).toHaveBeenCalledWith("Login failed. Please check your credentials.");
      expect(mockedNavigate).toHaveBeenCalledWith("/");
      expect(screen.getByPlaceholderText("Email")).toHaveValue("");
      expect(screen.getByPlaceholderText("Password")).toHaveValue("");
    });

    alertSpy.mockRestore();
  });
});
