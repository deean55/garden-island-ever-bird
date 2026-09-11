package com.fieldframe.theme

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.material3.Typography
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.sp

val Paper = Color(0xFFF3EFE6)
val Ink = Color(0xFF1C1915)
val Forest = Color(0xFF1E4336)
val ForestSoft = Color(0xFF2D5A49)
val Card = Color(0xFFFAF7F1)
val Muted = Color(0xFFE7E0D3)
val MutedFg = Color(0xFF6B6458)
val Rule = Color(0xFFD8D0C0)
val Danger = Color(0xFF8F2D2D)
val OnForest = Color(0xFFF4EFE6)

private val colors = lightColorScheme(
    primary = Forest,
    onPrimary = OnForest,
    secondary = Muted,
    onSecondary = Ink,
    background = Paper,
    onBackground = Ink,
    surface = Card,
    onSurface = Ink,
    surfaceVariant = Muted,
    onSurfaceVariant = MutedFg,
    outline = Rule,
    error = Danger,
    onError = OnForest,
)

private val typography = Typography(
    displayLarge = TextStyle(fontFamily = FontFamily.Serif, fontWeight = FontWeight.Medium, fontSize = 40.sp, lineHeight = 44.sp, color = Ink),
    headlineLarge = TextStyle(fontFamily = FontFamily.Serif, fontWeight = FontWeight.Medium, fontSize = 32.sp, lineHeight = 38.sp, color = Ink),
    headlineMedium = TextStyle(fontFamily = FontFamily.Serif, fontWeight = FontWeight.Medium, fontSize = 24.sp, lineHeight = 30.sp, color = Ink),
    titleLarge = TextStyle(fontFamily = FontFamily.Serif, fontWeight = FontWeight.Medium, fontSize = 20.sp, lineHeight = 26.sp, color = Ink),
    titleMedium = TextStyle(fontFamily = FontFamily.SansSerif, fontWeight = FontWeight.Medium, fontSize = 16.sp, color = Ink),
    bodyLarge = TextStyle(fontFamily = FontFamily.SansSerif, fontSize = 16.sp, lineHeight = 24.sp, color = Ink),
    bodyMedium = TextStyle(fontFamily = FontFamily.SansSerif, fontSize = 14.sp, lineHeight = 21.sp, color = Ink),
    labelLarge = TextStyle(fontFamily = FontFamily.SansSerif, fontWeight = FontWeight.Medium, fontSize = 14.sp, letterSpacing = 1.4.sp, color = Forest),
    labelSmall = TextStyle(fontFamily = FontFamily.SansSerif, fontSize = 12.sp, color = MutedFg),
)

@Composable
fun FieldframeTheme(content: @Composable () -> Unit) {
    MaterialTheme(
        colorScheme = colors,
        typography = typography,
        content = content,
    )
}
