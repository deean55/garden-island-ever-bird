package com.fieldframe

import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import androidx.navigation.navArgument
import com.fieldframe.platform.AppContainer
import com.fieldframe.platform.LocalAppContainer
import com.fieldframe.theme.FieldframeTheme
import com.fieldframe.ui.DashboardScreen
import com.fieldframe.ui.PdfScreen
import com.fieldframe.ui.PhotoScreen
import com.fieldframe.ui.ProjectScreen

@Composable
fun FieldframeApp(container: AppContainer) {
    FieldframeTheme {
        CompositionLocalProvider(LocalAppContainer provides container) {
            val nav = rememberNavController()
            NavHost(navController = nav, startDestination = "home") {
                composable("home") {
                    DashboardScreen(
                        onOpenProject = { nav.navigate("project/$it") },
                    )
                }
                composable(
                    "project/{id}",
                    arguments = listOf(navArgument("id") { type = NavType.StringType }),
                ) { entry ->
                    val id = entry.arguments?.getString("id") ?: return@composable
                    ProjectScreen(
                        projectId = id,
                        onBack = { nav.popBackStack() },
                        onOpenPhoto = { nav.navigate("project/$id/photo/$it") },
                        onOpenPdf = { nav.navigate("project/$id/pdf") },
                    )
                }
                composable(
                    "project/{id}/photo/{photoId}",
                    arguments = listOf(
                        navArgument("id") { type = NavType.StringType },
                        navArgument("photoId") { type = NavType.StringType },
                    ),
                ) { entry ->
                    val id = entry.arguments?.getString("id") ?: return@composable
                    val photoId = entry.arguments?.getString("photoId") ?: return@composable
                    PhotoScreen(id, photoId, onBack = { nav.popBackStack() })
                }
                composable(
                    "project/{id}/pdf",
                    arguments = listOf(navArgument("id") { type = NavType.StringType }),
                ) { entry ->
                    val id = entry.arguments?.getString("id") ?: return@composable
                    PdfScreen(id, onBack = { nav.popBackStack() })
                }
            }
        }
    }
}
