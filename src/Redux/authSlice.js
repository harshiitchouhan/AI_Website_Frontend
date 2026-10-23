
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = import.meta.env.PROD
    ? ""
    : (import.meta.env.VITE_API_URL || "http://localhost:4000").replace(/\/+$/, "");

const readResponse = async (response) => {
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
    }

    return data;
};

// Check current logged-in user
export const fetchCurrentUser = createAsyncThunk(
    "auth/fetchCurrentUser",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_URL}/api/auth/me`, {
                credentials: "include"
            });

            if (response.status === 401) {
                return null;
            }

            const data = await readResponse(response);

            return data.user;

        } catch (error) {
            return rejectWithValue(error.message);
        }
    },
    {
        condition: (_, { getState }) => {
            const { initialized, checkingSession } = getState().auth;

            return !initialized && !checkingSession;
        }
    }
);

// Login user
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_URL}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(credentials)
            });

            await readResponse(response);

            const userResponse = await fetch(`${API_URL}/api/auth/me`, {
                credentials: "include"
            });

            const data = await readResponse(userResponse);

            if (!data.user) {
                throw new Error("Unable to load user session");
            }

            return data.user;

        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Logout user
export const logoutUser = createAsyncThunk(
    "auth/logoutUser",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_URL}/api/auth/logout`, {
                method: "POST",
                credentials: "include"
            });

            await readResponse(response);

            return true;

        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    user: null,
    initialized: false,
    checkingSession: false,
    loading: false,
    error: null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearAuthError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder

            // Current user
            .addCase(fetchCurrentUser.pending, (state) => {
                state.checkingSession = true;
            })
            .addCase(fetchCurrentUser.fulfilled, (state, action) => {
                state.checkingSession = false;
                state.initialized = true;
                state.user = action.payload;
            })
            .addCase(fetchCurrentUser.rejected, (state, action) => {
                state.checkingSession = false;
                state.initialized = true;
                state.user = null;
                state.error = action.payload;
            })

            // Login
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.initialized = true;
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Logout
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.loading = false;
                state.initialized = true;
                state.user = null;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { clearAuthError } = authSlice.actions;

export default authSlice.reducer;
