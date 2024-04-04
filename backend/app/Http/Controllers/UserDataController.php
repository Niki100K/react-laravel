<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class UserDataController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'email' => 'required|unique:users',
            'password' => 'required|confirmed',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $user = User::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'email_verified_at' => now(),
            'password' => $request->input('password'),
            'remember_token' => Str::random(10),
        ]);
        $token = $user->createToken('token')->plainTextToken;
        return response()->json(['userId' => $user->id, 'token' => $token]);
    }

    public function login(Request $request)
    {
        $credetails = $request->only(['email', 'password']);
        
        $user = User::where('email', $credetails['email'])->first();
        if (!$user || !password_verify($credetails['password'], $user->password)) {
            return response()->json(['Email or Password is incorrect'], 403);
        }
        $user->tokens()->delete();
        $token = $user->createToken('token')->plainTextToken;
        return response()->json(['userId' => $user->id, 'token' => $token]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
